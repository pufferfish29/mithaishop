import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TPayload } from '../types/auth.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'JWT_AUTH') {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: process.env.JWT_ACCESSTOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TPayload) {
    return await this.userService.findOne({
      email: payload.email,
      id: payload.id,
    });
  }
}
