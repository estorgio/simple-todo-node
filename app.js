import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import expressSession from 'express-session';
import flash from 'connect-flash';

import config from './utils/config.js';
import { connectToDatabase } from './utils/database.js';
import mainRouter from './routes/main-route.js';
import {
  notFoundHandler,
  errorHandler,
} from './middlewares/error-middleware.js';
import globalsMiddleware from './middlewares/globals-middleware.js';
import { initDemo } from './utils/demo.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main(listen = False) {
  // Initialize Express instance
  const app = express();
  app.set('trust proxy', parseInt(process.env.PROXY_COUNT ?? 0));

  // Connect to database
  await connectToDatabase();

  // Initialize demo mode
  await initDemo();

  // Initialize EJS templating engine
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.set(
    'layout',
    path.join(__dirname, 'views', 'layouts', 'main-layout.ejs')
  );

  // Initialize middlewares
  app.use(methodOverride('_method'));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, 'static')));
  // app.use(cookieParser(config.APP_SECRET_KEY));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    expressSession({
      name: process.env.APP_NAME,
      secret: process.env.APP_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(flash());
  app.use(globalsMiddleware);

  // Routes
  app.use('/', mainRouter);

  // Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  if (listen) {
    app.listen(config.PORT, () =>
      console.log(`App is now listening on port ${config.PORT}.`)
    );
  }

  return app;
}

main(true);
