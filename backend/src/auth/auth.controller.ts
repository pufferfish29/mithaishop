import { Controller, Get, Post, Body, Param, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninUserDto, SignupUserDto } from "./dto/create-auth.dto";
import { Public, Refresh } from "./decorators/auth-guard.decorator";
import { FindUserDto } from "./dto/find-user.dto";
import type { Request, Response } from "express";
import { TCookieObj } from "./types/cookie.type";
import { TPayload } from "./types/auth.type";
import ms from "ms";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  async signup(@Body() createAuthDto: SignupUserDto) {
    return await this.authService.signup(createAuthDto);
  }

  @Public()
  @Post("signin")
  async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { refreshToken, ...signinResponse } =
      await this.authService.login(signinUserDto);

    response.cookie("refreshToken", refreshToken, {
      maxAge: ms("7d"),
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "dev",
      httpOnly: true,
      path: "/api",
    });

    return signinResponse;
  }

  @Get(":id")
  async findOne(@Param() findUserDto: FindUserDto) {
    const user = await this.authService.findOne(findUserDto);
    return user;
  }

  @Refresh()
  @Post("refresh")
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshToken = (request.cookies as TCookieObj).refreshToken!;
    const user = request.user as TPayload;
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.verifyAndRotateToken(user, refreshToken);

    response.cookie("refreshToken", newRefreshToken, {
      maxAge: ms("7d"),
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "dev",
      httpOnly: true,
      path: "/api",
    });

    return { ...user, accessToken };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("refreshToken", {
      sameSite: "none",
      secure: process.env.NODE_ENV !== "dev",
      httpOnly: true,
    });
    return { message: "logout success" };
  }
}
