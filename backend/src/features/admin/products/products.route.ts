import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getGrouped,
  getOne,
  createOne,
  createBulk,
  updateOne,
  updateBulk,
  deleteOne,
  deleteBulk,
} from './products.controller.js';

const adminProductRouter = Router();

// Fetch all, grouped by category
adminProductRouter.get('/grouped', asyncHandler(getGrouped));

// Single-item operations
adminProductRouter.get('/:id', asyncHandler(getOne));
adminProductRouter.post('/', asyncHandler(createOne));
adminProductRouter.put('/:id', asyncHandler(updateOne));
adminProductRouter.delete('/:id', asyncHandler(deleteOne));

// Bulk operations
adminProductRouter.post('/bulk', asyncHandler(createBulk));
adminProductRouter.put('/bulk', asyncHandler(updateBulk));
adminProductRouter.delete('/bulk', asyncHandler(deleteBulk));

export default adminProductRouter;
