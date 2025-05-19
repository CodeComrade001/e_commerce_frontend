// src/features/admin/order/order.analytics.route.ts

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as controller from './order.analytics.controller.js';

const OrderAnalyticsRoute = Router();
// Monthly bar‐chart data
OrderAnalyticsRoute.get('/monthly', asyncHandler(controller.getMonthlyOrders));

// Date‐range bar‐chart data
OrderAnalyticsRoute.get('/range', asyncHandler(controller.getOrdersInRange));

// Weekly sales % change
OrderAnalyticsRoute.get('/weekly-change', asyncHandler(controller.getWeeklySalesChange));

// Line‐chart endpoints (reusing same handlers under different paths)
OrderAnalyticsRoute.get('/monthly-line', asyncHandler(controller.getMonthlyOrdersLine));
OrderAnalyticsRoute.get('/weekly-line', asyncHandler(controller.getWeeklySalesChangeLine));

// Weekly completion stats (completed vs missed)
OrderAnalyticsRoute.get('/weekly-completion', asyncHandler(controller.getWeeklyCompletionStats));

// Weekly coupon usage ratios
OrderAnalyticsRoute.get('/weekly-sales-ratio', asyncHandler(controller.getWeeklySalesRatios));

// Customer purchase summary
OrderAnalyticsRoute.get('/customer-summary', asyncHandler(controller.getCustomerPurchaseSummary));

export default OrderAnalyticsRoute;
