import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { JwtAuthStrategy } from "./strategies/auth.strategy";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [PassportModule, UserModule, CommonModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
})
export class AuthModule {}
