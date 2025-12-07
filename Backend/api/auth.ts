import serverless from 'serverless-http';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/index';

const handler = serverless(app);

export default async (req:VercelRequest, res:VercelResponse) => {
  const allowedOrigin = process.env.CLIENT_URL || req.headers.origin || '*';

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return res.status(200).end();
  }

  return handler(req, res);
};