// src/features/user/user.controller.ts
import { RequestHandler } from 'express';
import { CreateNewAccount, LogInExistingAccount } from './user.service.js';
import { createSession, validateSession } from '../session/session.service.js';

export const SignUp: RequestHandler = async (req, res, next): Promise<void> => {
  console.log("🚀 ~ constSignUp:RequestHandler= ~ req:", req)
  try {
    console.log("🚀 ~ constSignUp:RequestHandler= ~ req:", req)

    const { name, email, password } = req.body.params as {
      name: string;
      email: string;
      password: string;
    };
    console.log("🚀 ~ constSignUp:RequestHandler= ~ password:", password)
    console.log("🚀 ~ constSignUp:RequestHandler= ~ email:", email)
    console.log("🚀 ~ constSignUp:RequestHandler= ~ name:", name)

    const { result, userId } = await CreateNewAccount({ name, email, password });
    if (!result) {
      res.status(400).json({ error: 'Could not create account' });
      return;                       // ← no return res…, just return void
    }

    const sessionResult = await createSession(userId);
    if (sessionResult !== null) {
      const { token, expiresAt } = sessionResult;
      res.cookie('SESSION', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: expiresAt,
      })
      res.cookie('USERID', String(userId), {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: expiresAt,
      });
    };

    res.status(201).json({ userId });
    return;                         // ← optional explicit return
  } catch (err) {
    next(err);
  }
};

export const Login: RequestHandler = async (req, res, next): Promise<void> => {
  console.log("🚀 ~ constLogin:RequestHandler= ~ req:", req)
  try {
    console.log("🚀 ~ constLogin:RequestHandler= ~ req.body:", req.body)
    const { email, password } = req.body.params as {
      email: string;
      password: string;
    };

    console.log("🚀 ~ constLogin:RequestHandler= ~ password:", password)
    console.log("🚀 ~ constLogin:RequestHandler= ~ email:", email)

    const loginResult = await LogInExistingAccount(email, password);
    if (!loginResult.result) {
      res.status(401).json({ error: 'Invalid credentials username or password' });
      return;
    }

    let session = await validateSession(loginResult.userId);
    if (!session && session == null) {
      session = await createSession(loginResult.userId);
    }

    if (session !== null) {
      res.cookie('SESSION', session.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: session.expiresAt,
      })
      res.cookie('USERID', String(loginResult.userId), {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: session.expiresAt,
      });
    };
 
    res.status(200).json({ result: true, userId: loginResult.userId });
    return;
  } catch (err) {
    next(err);
  }
};

export const GetCurrentUser: RequestHandler = (req, res) => {
  // authMiddleware has set req.userId
  console.log("🚀 ~ GetCurrentUser: function has started" )
  console.log("🚀 ~ GetCurrentUser:", GetCurrentUser)
  const userId = (req as any).userId as number;
  res.json({ userId });
};
