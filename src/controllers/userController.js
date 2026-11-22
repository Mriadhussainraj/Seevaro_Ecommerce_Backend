import User from '../models/userModel.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    return ApiResponse.success(res, 'Users retrieved successfully', { users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }
    return ApiResponse.success(res, 'User retrieved successfully', { user });
  } catch (error) {
    next(error);
  }
};
