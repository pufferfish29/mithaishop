import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { compare, genSalt, hash } from "bcryptjs";
import { FindUserDto } from "./dto/find-user.dto";
import { SigninUserDto, SignupUserDto } from "./dto/create-auth.dto";
import {
  ACCESS_TOKEN_PROVDER,
  REFRESH_TOKEN_PROVDER,
} from "src/common/providers/jwt-token.provider";
import { JwtService } from "@nestjs/jwt";
import { BAD_COOKIE, INVALID_CREDENTIALS } from "./constants/constants";
import { RedisService } from "src/redis/redis.service";
import ms from "ms";

import type { TError } from "./types/error.types";
import type { TPayload, TUser } from "./types/auth.type";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    @Inject(ACCESS_TOKEN_PROVDER)
    private readonly accessTokenProvider: JwtService,
    @Inject(REFRESH_TOKEN_PROVDER)
    private readonly refreshTokenProvider: JwtService
  ) {}

  private async generateTokensAndStore<T extends object & TPayload>(
    _payload: T
  ) {
    const payload = { email: _payload.email, id: _payload.id };

    const [accessToken, refreshToken] = await Promise.all([
      this.accessTokenProvider.signAsync(payload),
      this.refreshTokenProvider.signAsync(payload),
    ]);

    const stateOk = await this.redisService.set(
      `refresh:${_payload.id}`,
      refreshToken,
      ms("7d")
    );

    if (stateOk !== "OK") {
      throw new InternalServerErrorException("Failed to store refresh token");
    }

    return { accessToken, refreshToken };
  }

  async signup(createAuthDto: SignupUserDto) {
    const existingUser = await this.userService.findOne({
      email: createAuthDto.email,
    });
    if (existingUser) throw new ConflictException("user already exists");

    const salt = await genSalt();
    const hashedPassword = await hash(createAuthDto.password, salt);
    return this.userService.create({
      ...createAuthDto,
      password: hashedPassword,
    });
  }

  async findOne(findUserDto: FindUserDto) {
    const user = await this.userService.findOne({ id: findUserDto.id });
    if (!user) throw new NotFoundException("user not found");
    return user;
  }

  async validateUser(signinUserDto: SigninUserDto) {
    const user = await this.userService.unsafeFindOne({
      email: signinUserDto.email,
    });
    if (!user) return null;
    const { password: hashedPassword, ...other } = user;
    const comparePassword = await compare(
      signinUserDto.password,
      hashedPassword
    );
    if (!comparePassword) return null;
    else return other;
  }

  async login(signinUserDto: SigninUserDto) {
    const user = await this.validateUser(signinUserDto);
    if (!user) {
      throw new UnauthorizedException({
        code: INVALID_CREDENTIALS,
        message: "invalid credentials",
      });
    }

    const tokens = await this.generateTokensAndStore(user);
    return { ...user, ...tokens };
  }

  async verifyAndRotateToken(user: TUser, token: string) {
    const compareCookie = await this.redisService.get(`refresh:${user.id}`);
    if (!compareCookie || token !== compareCookie) {
      const errObj: TError = {
        code: BAD_COOKIE,
        message: "sign in again",
      };
      throw new UnauthorizedException(errObj);
    }

    return this.generateTokensAndStore(user);
  }
}
