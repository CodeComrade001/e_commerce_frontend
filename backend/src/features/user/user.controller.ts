import { RequestHandler } from 'express';
import * as userService from './user.service.js';
import { FetchUserDto } from './dto/fetch-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { WishlistDto } from './dto/wishlist.dto.js';
import { validateSchema } from '../../utils/validate.js';
import { OrderRequestDto } from './dto/order.dto.js';
import { userIdDto } from './dto/userId.dto.js';

export const fetchUserDetails: RequestHandler = async (req, res, next) => {
  console.log("🚀 ~ const fetchUserDetails:RequestHandler= ~ req.body:", req.body)
  try {
    const { userId } = validateSchema(FetchUserDto, req.body);
    const user = await userService.getUserDetails(userId);
    res.json({ result: true, user });
  } catch (err) {
    console.log("🚀 ~ const fetchUserDetails:RequestHandler= ~ err:", err)
    next(err);
  }
};

export const addOrder: RequestHandler = async (req, res, next) => {
  console.log("🚀 ~ const addOrder:RequestHandler= ~ req.body value:", req.body)
  try {
    const dto = validateSchema(OrderRequestDto, req.body);
    await userService.placeOrder(dto);
    res.status(201).json({ result: true });
  } catch (err) {
    console.log("🚀 ~ const addOrder:RequestHandler= ~ err:", err)
    next(err);
  }
};

export const GetPlacedOrder: RequestHandler = async (req, res, next) => {
  try {
    const dto = validateSchema(userIdDto, req.body);
    const user = await userService.getUserPlaceOrder(dto);
    console.log("🚀 ~ constGetPlacedOrder:RequestHandler= ~ user:", user)
    res.status(201).json({ result: true, user });
  } catch (err) {
    console.log("🚀 ~ const addOrder:RequestHandler= ~ err:", err)
    next(err);
  }
};

export const FetchAllUserWishlist: RequestHandler = async (req, res, next) => {
  console.log("🚀 ~ constFetchAllUserWishlist:RequestHandler= ~ req:", req.body)
  try {
    const dto = validateSchema(userIdDto, req.body);
    const wishlistData = await userService.fetchWishlistOrder(dto);
    console.log("🚀 ~ constFetchAllUserWishlist:RequestHandler= ~ wishlistData:", wishlistData)
    res.status(201).json({ result: true, wishlistData });
  } catch (err) {
    console.log("🚀 ~ constFetchAllUserWishlist:RequestHandler= ~ err:", err)
    next(err);
  }
};

export const addToWishlist: RequestHandler = async (req, res, next) => {
  console.log("🚀 ~ const addToWishlist:RequestHandler= ~ req.body:", req.body)
  try {
    const dto = validateSchema(WishlistDto, req.body);
    await userService.addWishlist(dto);
    res.status(201).json({ result: true });
  } catch (err) {
    console.log("🚀 ~ const addToWishlist:RequestHandler= ~ err:", err)
    next(err);
  }
};

export const removeFromWishlist: RequestHandler = async (req, res, next) => {
  console.log("🚀 ~ const removeFromWishlist:RequestHandler= ~ req.body:", req.body)
  try {
    const dto = validateSchema(WishlistDto, req.body);
    await userService.removeWishlist(dto);
    res.json({ result: true });
  } catch (err) {
    console.log("🚀 ~ const removeFromWishlist:RequestHandler= ~ err:", err)
    next(err);
  }
};

export const updateUserDetails: RequestHandler = async (req, res, next) => {
  console.log("🚀 ~ const updateUserDetails:RequestHandler= ~ req.body:", req.body)
  try {
    const dto = validateSchema(UpdateUserDto, req.body);
    await userService.updateUser(dto);
    res.json({ result: true });
  } catch (err) {
    console.log("🚀 ~ const updateUserDetails:RequestHandler= ~ err:", err)
    next(err);
  }
};
