import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db'; // Import the pool
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. GLOBAL REQUEST LOGGER (See every request hitting the server)
app.use((req, res, next) => {
  console.log(`👀 [${req.method}] ${req.url}`);
  next();
});

// Mount Routes
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// 2. FORCE DB CONNECTION TEST ON STARTUP
const startServer = async () => {
  try {
    // Try to run a simple query
    await pool.query('SELECT NOW()');
    console.log('✅ Database Connection Verified! (Query successful)');
    
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Database Connection FAILED:', err);
    // process.exit(1); // Optional: stop server if DB fails
  }
};

startServer();