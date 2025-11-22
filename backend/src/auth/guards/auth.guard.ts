import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
  IS_PUBLIC,
  IS_REFRESH_GUARD,
} from '../decorators/auth-guard.decorator';
import { REFRESH_TOKEN_PROVDER } from '../../common/providers/jwt-token.provider';
import { JwtService } from '@nestjs/jwt';
import { TError } from '../types/error.types';
import { BAD_COOKIE, MISSING_COOKIE } from '../constants/constants';
import { TCookieObj } from '../types/cookie.type';
import { Request } from 'express';
import { TPayload } from '../types/auth.type';

@Injectable()
export class JWTAuthGuard extends AuthGuard('JWT_AUTH') {
  constructor(
    private reflector: Reflector,
    @Inject(REFRESH_TOKEN_PROVDER) private readonly refreshJwt: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isRefresh = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_GUARD,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;
    if (isRefresh) return this.verifyRefreshToken(context);
    else return super.canActivate(context);
  }

  private async verifyRefreshToken(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const missingCookieErrObj: TError = {
      code: MISSING_COOKIE,
      message: 'signin required',
    };

    const refreshToken = (req.cookies as TCookieObj).refreshToken;
    if (!refreshToken) throw new UnauthorizedException(missingCookieErrObj);

    const badCookieErrObj: TError = {
      code: BAD_COOKIE,
      message: 'signin required',
    };
    try {
      const isValidToken = await this.refreshJwt.verifyAsync<TPayload>(
        refreshToken,
        { ignoreExpiration: false },
      );
      if (isValidToken) {
        req.user = { email: isValidToken.email, id: isValidToken.id };
        return true;
      } else throw new UnauthorizedException(badCookieErrObj);
    } catch (error) {
      console.error('[ERROR]:', error);
      throw new UnauthorizedException(badCookieErrObj);
    }
  }
}
