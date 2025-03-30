import type { Request, Response } from 'express';
import { createDecipheriv } from 'node:crypto';
import { decryptMessage, deriveKey } from '../services/encryption';

interface DebugRequestBody {
  userId: string;
  encryptedMessage: string;
}

export const debugDecrypt = (req: Request<{}, {}, DebugRequestBody>, res: Response): void => {
    const { userId, encryptedMessage } = req.body;
  
    const brokenDecrypt = (): string => {
      const key: Buffer = deriveKey(userId);
      const decipher = createDecipheriv('aes-256-cbc', key, Buffer.alloc(16, 0)); // Static IV used here
      return decipher.update(encryptedMessage, 'base64', 'utf8') + decipher.final('utf8');
    };
  
    try {
      brokenDecrypt();
    } catch (error: unknown) {
      // Fix: Use the correct decryption logic by extracting the IV from the payload
      const fixedResult: string = decryptMessage(userId, encryptedMessage);
      res.json({
        brokenError: (error as Error).message,
        fixedResult,
        explanation: 'Broken function used a static IV; fixed version extracts IV from payload.',
      });
    }
  };