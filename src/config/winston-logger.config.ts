import * as winston from 'winston';
import 'winston-daily-rotate-file';

// Since i have used winston for server logging, this is the initialization or the seting up of the logger.
export const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
    // desried what should be the content of each log.
  ),
  transports: [
    // Console logging
    new winston.transports.Console(),
    // File logging with daily rotation
    // This I have done to demonstrate scaling capabilities. In sitations with large backends, we cannot let the log files grow and grow to unamanageable size. Therefore we rotate the log files at checkpoints of either 20mb size or 14day stale.
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
