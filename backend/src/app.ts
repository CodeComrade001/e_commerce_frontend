// src/app.ts
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

export function createApp() {
  const app = express();
  app.use(cors());
 

  return app;
}
