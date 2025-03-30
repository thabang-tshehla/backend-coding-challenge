import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index';

interface UserRequestBody {
  userId: string;
}

export const createUser = (req: Request<{}, {}, UserRequestBody>, res: Response): void => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
  res.status(201).json({ token });
};
