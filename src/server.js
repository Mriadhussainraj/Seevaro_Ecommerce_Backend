import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Start Express Server
  const server = app.listen(ENV.PORT, () => {
    console.log(`🚀 Seevaro Server is running on port ${ENV.PORT} [${ENV.NODE_ENV}]`);
    console.log(`🔗 Health Check: http://localhost:${ENV.PORT}/api/v1/health`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    process.exit(1);
  });
};

startServer();
