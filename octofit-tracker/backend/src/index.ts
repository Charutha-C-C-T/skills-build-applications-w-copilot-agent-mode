import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }

  console.log(`Backend API listening on port ${port}`);
});
