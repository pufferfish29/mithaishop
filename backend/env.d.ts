declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_ACCESSTOKEN_SECRET: string;
      JWT_ACCESSTOKEN_EXPIRESIN: string;
      JWT_REFRESHTOKEN_SECRET: string;
      JWT_REFRESHTOKEN_EXPIRESIN: string;
      POSTGRES_HOST: string;
      POSTGRES_HOST_LOCAL: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_PORT: string;
      POSTGRES_URL: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      NODE_ENV: "dev" | "prod";
      RESEND_API_KEY: string;
      RESEND_FROM_USER: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {};
