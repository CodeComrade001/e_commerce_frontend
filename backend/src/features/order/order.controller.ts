
// ============================
// Controller: src/features/admin/order/order.controller.ts
import { RequestHandler } from 'express';
import * as service from './order.service.js';
import { validateSchema } from '../../utils/validate.js';
import { IdParamDto } from './dto/id-param.dto.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';
import { BulkCreateOrderDto, BulkUpdateOrderDto } from './dto/bulk-order.dto.js';
import { DeleteBulkDto } from './dto/delete-bulk.dto.js';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const orders = await service.getAllOrders();
    res.json({ result: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOne: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const order = await service.getOrderById(id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json({ result: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const getByDateRange: RequestHandler = async (req, res, next) => {
  try {
    const { from, to } = req.query as { from: string; to: string };
    const orders = await service.getOrdersByDateRange(from, to);
    res.json({ result: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    const payload = validateSchema(CreateOrderDto, req.body);
    const order = await service.createOrder(
      payload.user_id,
      payload.complete_order,
      payload.canceled_order,
      new Date(payload.orders_at),
      payload.product_details
    );
    res.status(201).json({ result: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const data = validateSchema(UpdateOrderDto, req.body);
    const updated = await service.updateOrder(id, data);
    if (!updated) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json({ result: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const success = await service.deleteOrder(id);
    if (!success) {
      res.status(404).json({ error: 'Order not found' });
      return
    }
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
};

export const bulkCreate: RequestHandler = async (req, res, next) => {
  try {
    const payload = validateSchema(BulkCreateOrderDto, req.body);
    const created = await Promise.all(
      payload.map(o =>
        service.createOrder(
          o.user_id,
          o.complete_order,
          o.canceled_order,
          new Date(o.orders_at),
          o.product_details
        )
      )
    );
    res.status(201).json({ result: true, data: created });
  } catch (err) {
    next(err);
  }
};

export const bulkUpdate: RequestHandler = async (req, res, next) => {
  try {
    const payload = validateSchema(BulkUpdateOrderDto, req.body);
    const updated = await Promise.all(
      payload.map(item => service.updateOrder(item.id, item.data))
    );
    res.json({ result: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const bulkDelete: RequestHandler = async (req, res, next) => {
  try {
    const { ids } = validateSchema(DeleteBulkDto, req.body);
    const count = await service.deleteOrdersBulk(ids);
    res.json({ result: true, count });
  } catch (err) {
    next(err);
  }
};

export const complete: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const order = await service.completeOrder(id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return
    }
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
};

export const cancel: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const order = await service.cancelOrder(id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return
    }
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
};
