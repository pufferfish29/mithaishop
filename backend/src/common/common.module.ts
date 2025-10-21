import { Module } from '@nestjs/common';
import {
  JWTAccesssTokenProvider,
  JWTRefreshTokenProvider,
} from './providers/jwt-token.provider';

@Module({
  providers: [JWTAccesssTokenProvider, JWTRefreshTokenProvider],
  exports: [JWTAccesssTokenProvider, JWTRefreshTokenProvider],
})
export class CommonModule {}
