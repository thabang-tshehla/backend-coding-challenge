import type { Request, Response } from 'express';
import { encryptMessage, decryptMessage } from '../services/encryption';
import { storeMessage, getMessages } from '../services/storage';


interface MessageRequestBody {
  userId: string;
  message: string;
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