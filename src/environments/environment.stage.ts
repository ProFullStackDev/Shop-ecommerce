import { Environment } from '@delon/theme';
export const environment = {
  production: false,
  api: {
    // baseUrl: 'https://api.tyqoon.co',
    baseUrl: 'http://47.112.195.182:11111',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
