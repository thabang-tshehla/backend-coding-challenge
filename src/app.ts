import express, { type Express } from 'express';

const app: Express = express();

app.use(express.json());

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;