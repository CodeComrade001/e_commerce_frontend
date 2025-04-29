// src/features/user/user.controller.ts
import { RequestHandler } from 'express';
import { CreateNewAccount, LogInExistingAccount } from './user.service.js';


export const Login: RequestHandler = async (req, res, next) => {
  try {
    // extract from body, not query
    const { email, password } = req.query as {
      email: string;
      password: string;
    };

    const loginResult = await LogInExistingAccount(email, password);
    // send status 200 + JSON payload
    res.status(200).json(loginResult);
  } catch (err) {
    next(err);
  }
};

export const SignUp: RequestHandler = async (req, res, next) => {
  console.log("🚀 ~ constSignUp:RequestHandler= ~ req:", req.query)
  try {
    const { name, email, password } = req.query as {
      name: string;
      email: string;
      password: string;
    };

    const newUser = await CreateNewAccount({ name, email, password });
    console.log("🚀 ~ constSignUp:RequestHandler= ~ newUser:", newUser)
    res.send(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

