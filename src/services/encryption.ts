import { createCipheriv, createDecipheriv, randomBytes, createHmac } from 'node:crypto';
import config from '../config';

interface EncryptedPayload {
  iv: Buffer;
  ciphertext: Buffer;
}

export const deriveKey = (userId: string): Buffer => {
  return createHmac('sha256', config.encryptionSecret).update(userId).digest();
};

export const encryptMessage = (userId: string, message: string): string => {
  const key: Buffer = deriveKey(userId);
  const iv: Buffer = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  const encrypted: Buffer = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);
  return Buffer.concat([iv, encrypted]).toString('base64');
};

export const decryptMessage = (userId: string, encrypted: string): string => {
  const key: Buffer = deriveKey(userId);
  const buffer: Buffer = Buffer.from(encrypted, 'base64');
  const iv: Buffer = buffer.slice(0, 16);
  const ciphertext: Buffer = buffer.slice(16);
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
};