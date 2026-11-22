import { ApiResponse } from '../utils/apiResponse.js';

// 404 Route Not Found Handler
export const notFoundHandler = (req, res, next) => {
  return ApiResponse.error(res, `Route not found: ${req.originalUrl}`, 404);
};

// Global Error Handler
export const globalErrorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(
    res,
    message,
    statusCode,
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
};
