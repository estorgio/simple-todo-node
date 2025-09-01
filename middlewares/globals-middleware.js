import config from '../utils/config.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const globalsMiddleware = (req, res, next) => {
  res.locals.config = config;
  res.locals.title = '?';
  res.locals.node_environment = process.env.NODE_ENV ?? 'production';
  res.locals.client_ip = req.ip;
  res.locals.dayjs = dayjs;
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');

  next();
};

export default globalsMiddleware;
