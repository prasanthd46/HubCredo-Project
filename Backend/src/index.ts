import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import serverless from "serverless-http";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true               
}));

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);

export default app;
