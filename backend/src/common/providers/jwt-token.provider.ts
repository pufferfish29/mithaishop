import { Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const ACCESS_TOKEN_PROVDER = "ACCESS_TOKEN_PROVIDER";
export const REFRESH_TOKEN_PROVDER = "REFRESH_TOKEN_PROVIDER";

export const JWTAccesssTokenProvider: Provider = {
  provide: ACCESS_TOKEN_PROVDER,
  useFactory() {
    return new JwtService({
      secret: process.env.JWT_ACCESSTOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRESIN },
    });
  },
};

export const JWTRefreshTokenProvider: Provider = {
  provide: REFRESH_TOKEN_PROVDER,
  useFactory() {
    return new JwtService({
      secret: process.env.JWT_REFRESHTOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRESIN },
    });
  },
};
