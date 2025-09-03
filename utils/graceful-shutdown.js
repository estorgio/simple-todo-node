import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

const GRACEFUL_SHUTDOWN_TIMEOUT_MS = 20000;
let shuttingDown = false;

// Stops incoming HTTP requests once the shutdown has initiated
export function gracefulShutdownMiddleware(req, res, next) {
  if (shuttingDown) {
    res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .send('Server is shutting down. Try again later.');
    return;
  }
  next();
}

// Attach a graceful shutdown handler into a server instance
export function enableGracefullShutdown(server) {
  process.on('SIGINT', shutdownHandler(server));
  process.on('SIGTERM', shutdownHandler(server));
}

function shutdownHandler(server) {
  return (signal) => {
    shuttingDown = true;

    console.log(
      `App has received a ${signal} signal. Graceful shutdown has initiated!`
    );

    server.close(async (err) => {
      if (err) {
        console.error('Error closing server', err);
        process.exit(1);
      }

      try {
        // Disconnect MongoDB connections
        console.log('App is closing database connection...');
        await mongoose.disconnect();
        console.log('App has successfully closed database connection!');

        console.log('Cleanup finished. Exiting.');
        process.exit(0);
      } catch (e) {
        console.error('Error during shutdown cleanup', e);
        process.exit(1);
      }
    });

    // Failsafe: force exit after timeout
    setTimeout(() => {
      console.error('Forcing shutdown after timeout...');
      process.exit(1);
    }, GRACEFUL_SHUTDOWN_TIMEOUT_MS).unref();
  };
}
