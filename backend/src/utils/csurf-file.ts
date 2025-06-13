// src/utils/csurf-file.ts
import csurf, { CookieOptions as CSRF_CookieOptions } from 'csurf';
import { RequestHandler, Request } from 'express';

// (Optional) augment Express.Request so TS knows about req.csrfToken()
declare global {
  namespace Express {
    interface Request {
      csrfToken(): string;
    }
  }
}

export interface CSURFOptions {
  value?: (req: Request) => string;
  /**
   * @default false
   */
  cookie?: CSRF_CookieOptions | boolean;
  ignoreMethods?: string[];
  sessionKey?: string;
}

/**
 * Thin wrapper around the real `csurf` package,
 * so you can customize typings or defaults.
 */
export default function createCsurf(options?: CSURFOptions): RequestHandler {
  return csurf(options as any);
}
