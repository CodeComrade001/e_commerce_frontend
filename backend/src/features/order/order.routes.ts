
// ============================
// Routes: src/features/admin/order/order.route.ts
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as controller from './order.controller.js';

const UserOrderRoute = Router();

UserOrderRoute.get('/', asyncHandler(controller.getAll));
UserOrderRoute.get('/range', asyncHandler(controller.getByDateRange));
UserOrderRoute.get('/:id', asyncHandler(controller.getOne));
UserOrderRoute.post('/', asyncHandler(controller.create));
UserOrderRoute.put('/:id', asyncHandler(controller.update));
UserOrderRoute.delete('/:id', asyncHandler(controller.remove));

// Bulk operations
UserOrderRoute.post('/bulk', asyncHandler(controller.bulkCreate));
UserOrderRoute.put('/bulk', asyncHandler(controller.bulkUpdate));
UserOrderRoute.delete('/bulk', asyncHandler(controller.bulkDelete));

// Status operations
UserOrderRoute.patch('/:id/complete', asyncHandler(controller.complete));
UserOrderRoute.patch('/:id/cancel', asyncHandler(controller.cancel));

export default UserOrderRoute;
