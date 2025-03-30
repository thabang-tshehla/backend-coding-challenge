import express, { type Express } from 'express';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';
import { authenticate } from './middleware/auth';

const app: Express = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/messages', authenticate, messageRoutes);

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;