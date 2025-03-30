import config from '../config/index';

interface Message {
  payload: string;
  timestamp: number;
}

interface MessageStore {
  [userId: string]: Message[];
}

const messageStore: MessageStore = {};

const EXPIRY_TIME = config.messageExpiryMs;

export const storeMessage = (userId: string, payload: string): void => {
  if (!messageStore[userId]) {
    messageStore[userId] = [];
  }
  messageStore[userId].push({ payload, timestamp: Date.now() });
};

/**
 * Retrieve messages for user, also filter out expired messages
 */
export const getMessages = (userId: string): string[] | null => {
  const messages = messageStore[userId];
  if (!messages) return null;

  const validMessages = messages.filter(
    (message) => Date.now() - message.timestamp < EXPIRY_TIME
  );
  messageStore[userId] = validMessages;

  return validMessages.map((message) => message.payload);
};