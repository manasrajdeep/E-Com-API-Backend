//Manage routes/paths to productController

//import express
import express from'express';
import  ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';



//2.Initalize Express router
const productRouter=express.Router();

//
const productController=new ProductController();


//All the paths to controller methods
//localhost/api/products
productRouter.get('/',(req,res)=>{productController.getAllProducts(req,res)});
productRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});
productRouter.get('/filter',(req,res)=>{productController.filterProducts(req,res)});
productRouter.get('/:id',(req,res)=>{productController.getOneProduct(req,res)});
productRouter.post('/rating',(req,res)=>{productController.rateProduct(req,res)});

export default productRouter;
