import type { Request, Response } from 'express';
import { encryptMessage, decryptMessage, deriveKey } from '../services/encryption';
import { storeMessage, getMessages } from '../services/storage';
import { createDecipheriv } from 'node:crypto';

interface MessageRequestBody {
  userId: string;
  message: string;
}

interface DebugRequestBody {
  userId: string;
  encryptedMessage: string;
}

export const postMessage = (req: Request<{}, {}, MessageRequestBody>, res: Response): void => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    res.status(400).json({ error: 'userId and message are required' });
    return;
  }

  const encrypted: string = encryptMessage(userId, message);
  storeMessage(userId, encrypted);
  res.status(201).json({ status: 'Message stored successfully' });
};

export const getUserMessages = (req: Request<{ userId: string }>, res: Response): void => {
  const { userId } = req.params;
  const encryptedMessages: string[] | null = getMessages(userId);


  if (!encryptedMessages) {
    res.status(404).json({ error: 'No messages found for this user' });
    return;
  }

  const decryptedMessages: string[] = encryptedMessages.map((msg) => decryptMessage(userId, msg));
  res.json({ messages: decryptedMessages });
};

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