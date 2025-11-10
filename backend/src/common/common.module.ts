import { Module } from "@nestjs/common";
import {
  JWTAccesssTokenProvider,
  JWTRefreshTokenProvider,
} from "./providers/jwt-token.provider";
import { MailerService } from "./providers/mail.provider";

@Module({
  providers: [JWTAccesssTokenProvider, JWTRefreshTokenProvider, MailerService],
  exports: [JWTAccesssTokenProvider, JWTRefreshTokenProvider, MailerService],
})
export class CommonModule {}
