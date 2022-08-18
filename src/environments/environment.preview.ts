import { Environment } from '@delon/theme';
export const environment = {
  production: true,
  api: {
    baseUrl: 'https://api.tyqoon.co',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
