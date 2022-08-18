const fs = require("fs");
const path = require('path')

const filePath = path.resolve(__dirname, '../../src/environments/environment.prod.ts')

function main() {
  const baseUrl = process.env.WEBSITE_API_BASEURL || 'http://47.112.195.182:11111'
  const data =`import { Environment } from '@delon/theme';
export const environment = {
  production: true,
  api: {
    baseUrl: '${baseUrl}',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;`
  fs.writeFileSync(filePath, data);
}

main();
