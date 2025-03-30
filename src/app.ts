import express, { type Express } from 'express';
import userRoutes from './routes/users';
const app: Express = express();

app.use(express.json());

app.use('/users', userRoutes);

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;