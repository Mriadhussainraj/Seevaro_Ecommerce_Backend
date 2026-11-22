import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { ENV } from '../config/env.js';
import { ApiResponse } from '../utils/apiResponse.js';

const generateToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return ApiResponse.error(res, 'Please provide name, email, and password', 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(res, 'User with this email already exists', 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    const token = generateToken(user._id);

    return ApiResponse.success(
      res,
      'User registered successfully',
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        token,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, 'Please provide email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return ApiResponse.error(res, 'Invalid email or password', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return ApiResponse.error(res, 'Invalid email or password', 401);
    }

    const token = generateToken(user._id);

    return ApiResponse.success(res, 'Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    return ApiResponse.success(res, 'Profile retrieved successfully', {
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
