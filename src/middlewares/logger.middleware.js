import fs from "fs";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "log.txt" })],
});

// //Doing logger mannually without lib.
// const fsPromise = fs.promises;
// async function log(logdata) {
//   try {
//     logdata = `\n${new Date().toString()} - ${logdata}\n`;

//     await fsPromise.appendFile("log.txt", logdata);
//   } catch (err) {
//     console.log(err);
//   }
// }

const loggerMiddleware = async (req, res, next) => {
  //1.log request body and url
  const logData = `${req.url} + ${JSON.stringify(req.body)}`;

  // // for manual logger
  // await log(logData);

  //for winston lib
  logger.info(logData);
  next();
};

export default loggerMiddleware;
