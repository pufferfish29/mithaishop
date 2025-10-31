// Centralized auth configuration
export const AUTH_CONFIG = {
  accessTokenExpiry: 30 * 60,
  refreshBuffer: 5 * 60 * 1000,
  sessionRefreshInterval: 29 * 60,
  refreshTokenExpiry: 1 * 24 * 60 * 60,
} as const;
