import { RequestHandler } from 'express';
import * as service from './products.service.js';
import { validateSchema } from '../../../utils/validate.js';

import { IdParamDto } from './dto/id-param.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { BulkCreateDto, BulkUpdateDto } from './dto/bulk-product.dto.js';
import { DeleteBulkDto } from './dto/delete-bulk.dto.js';

export const getGrouped: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const grouped = await service.getAllProductsGroupedByCategory();
    res.json({ result: true, data: grouped });
  } catch (err) {
    next(err);
  }
};

export const getOne: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const product = await service.getProductById(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ result: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const createOne: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const dto = validateSchema(CreateProductDto, req.body);
    const product = await service.createProduct(dto);
    res.status(201).json({ result: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const createBulk: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const items = validateSchema(BulkCreateDto, req.body);
    const created = await service.createProductsBulk(items);
    res.status(201).json({ result: true, data: created });
  } catch (err) {
    next(err);
  }
};

export const updateOne: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const dto = validateSchema(UpdateProductDto, req.body);
    const updated = await service.updateProduct(id, dto);
    if (!updated) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ result: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const updateBulk: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const updates = validateSchema(BulkUpdateDto, req.body);
    const results = await service.updateProductsBulk(updates);
    res.status(200).json({ result: true, data: results });
  } catch (err) {
    next(err);
  }
};

export const deleteOne: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = validateSchema(IdParamDto, req.params);
    const success = await service.deleteProduct(id);
    if (!success) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const deleteBulk: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { ids } = validateSchema(DeleteBulkDto, req.body);
    const count = await service.deleteProductsBulk(ids);
    res.status(200).json({ result: true, deletedCount: count });
  } catch (err) {
    next(err);
  }
};
