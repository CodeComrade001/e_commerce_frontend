// src/features/admin/order/order.analytics.controller.ts

import { RequestHandler } from 'express';
import * as analytics from './order.analytics.service.js';

// 1. Monthly bar-chart data
export const getMonthlyOrders: RequestHandler = async (_req, res, next) => {
  try {
    const data = await analytics.getMonthlyOrderCounts();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// 1b. Range-based bar-chart data
export const getOrdersInRange: RequestHandler = async (req, res, next) => {
  try {
    const { start, end } = req.query as { start: string; end?: string };
    const data = await analytics.getOrderCountsInRange(start, end);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// 2. Weekly sales percentage change
export const getWeeklySalesChange: RequestHandler = async (_req, res, next) => {
  try {
    const data = await analytics.getWeeklySalesChange();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// 3. Line chart versions (reuse same data)
export const getMonthlyOrdersLine: RequestHandler = getMonthlyOrders;
export const getWeeklySalesChangeLine: RequestHandler = getWeeklySalesChange;

// 4. Weekly completion stats (completed vs missed)
export const getWeeklyCompletionStats: RequestHandler = async (_req, res, next) => {
  try {
    const data = await analytics.getWeeklyCompletionStats();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// 5. Weekly coupon usage ratios
export const getWeeklySalesRatios: RequestHandler = async (_req, res, next) => {
  try {
    const data = await analytics.weeklySalesRatio();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// 6. Customer purchase summary
export const getCustomerPurchaseSummary: RequestHandler = async (_req, res, next) => {
  try {
    const data = await analytics.getCustomerPurchaseSummary();
    res.json(data);
  } catch (err) {
    next(err);
  }
};


