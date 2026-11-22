import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { ApiResponse } from '../utils/apiResponse.js';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, ENV.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return ApiResponse.error(res, 'User no longer exists', 401);
      }

      return next();
    } catch (error) {
      return ApiResponse.error(res, 'Not authorized, invalid token', 401);
    }
  }

  if (!token) {
    return ApiResponse.error(res, 'Not authorized, no token provided', 401);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        'Forbidden: You do not have permission to access this resource',
        403
      );
    }
    next();
  };
};
