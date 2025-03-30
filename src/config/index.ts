import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

interface Config {
  encryptionSecret: string;
  port: number;
  jwtSecret: string;
  messageExpiryMs: number;
}

const config: Config = {
  encryptionSecret: process.env.ENCRYPTION_SECRET || 'encryption-thabang-swizil-backend-challenge',
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'jwt-thabang-swizil-backend-challenge',
  messageExpiryMs: parseInt(process.env.MESSAGE_EXPIRY_MS || '600000', 10),
};

export default config;