//import express module
import "./env.js";

import express from "express";
import cors from 'cors';


// import ProductController from './src/features/product/product.controller';
import productRouter from "./src/features/product/product.router.js";
import bodyParser from "body-parser";
import UserRouter from "./src/features/user/user.router.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.router.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import {connectToMongoDB} from "./src/config/mongodb.js";

//create server using express
const app = express();

//CORS Policy configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  //return Ok for preflight request
  if (req.method == 'Option') {
    return res.sendStatus(200);
  }

  next();
});

//body-parser for any post req
app.use(bodyParser.json());
app.use(loggerMiddleware);


//Route
// app.get('/products',ProductController.getAllProducts);
//for all requests related to product, redirect to product routes.
//localhost:3200/api/products
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/cart", jwtAuth, cartRouter);
app.use("/api/user", UserRouter);

//default request handler
app.get("/", (req, res) => {
  res.send("Welcome to E-commerce APIs");
});

//Middleware to handle 404 requests
app.use((req, res) => {
  res.status(404).send("API not found");
});

//Specify the port number
app.listen(3000, () => {
  console.log("server is running on port 3000");
  connectToMongoDB();
});

console.log('Server is running at 3000')