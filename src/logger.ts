import { Config } from "./Config";
 
var winston = require('winston');

// define the custom settings for each transport (file, console)
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.splat(),
  winston.format.align(),
  winston.format.simple(),
  winston.format.printf(info => `${info.timestamp} \t${info.level} ${info.message}`)
);

const options = {
  file: {
    level: 'info',
    filename: Config.LOG_PATH + '/api-app.log',
    handleExceptions: true,
    format: logFormat,
    maxsize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat
    )
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

// create a stream object with a 'write' function that will be used by morgan
logger.stream = {
  write: function(message:string, encoding:string) {
    logger.info(message.replace(/\n$/, ''));
  },
};

export { logger }