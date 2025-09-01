const APP_NAME = process.env.APP_NAME || 'express-app';
const APP_TITLE = process.env.APP_TITLE || 'Express App';
const APP_SECRET_KEY = process.env.APP_SECRET_KEY || 'default';
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

export default {
  APP_NAME,
  APP_TITLE,
  APP_SECRET_KEY,
  PORT,
  NODE_ENV,
};
