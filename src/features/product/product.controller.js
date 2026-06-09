
import ProductModel from "./product.model.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
import ProductRepository from "./product.repository.js";


export  default class ProductController {
    constructor(){
        this.ProductRepository=new ProductRepository();
    }
    

    //Getall Product from product repository
    async getAllProducts(req, res) {
        const products = await this.ProductRepository.getAll();
        res.status(200).send(products);
    }

    //product repository for adding product
     async addProduct(req, res) {
        const {name,price,sizes}=req.body;
        
        const newProduct=new ProductModel(name,null,parseFloat(price),req.file.filename,null,sizes.split(','))
            
        const product=await this.ProductRepository.add(newProduct);
        res.status(201).send(product);

    };


    //get-one from product repository 
    async getOneProduct(req, res) {
        const id=req.params.id;
        const product=await this.ProductRepository.get(id);

        if(!product){
            return res.status(404).send("product not found");
        }else{
                res.status(200).send(product);
            }

    }


    //filterProduct repository
   async filterProducts(req,res){
        const {minPrice,maxPrice,category}=req.query;
        const filteredProducts=await this.ProductRepository.filter(minPrice,maxPrice,category);
        res.status(200).send(filteredProducts);
    }


    //Rate product by repository 
    async rateProduct(req, res) {
        const userID=req.userID;
        const productID=req.body.productID;
        const rating=req.body.rating;
        const error=await this.ProductRepository.rating(userID,productID,rating);
        if(error){
            res.status(400).send(error);
        }

        return res.status(200).send("Product has been rated successfully");

    }



    //product model
    // addProduct(req, res) {
    //     // console.log(req.body);
    //     // console.log("this is a post request")
    //     // res.status(201).send("product added");
    //     const {name,price,sizes}=req.body;
    //     const newProduct={
    //         name,
    //         price: parseFloat(price),
    //         sizes:sizes.split(','),
    //         imageUrl:req.file.filename,
    //     }
    //     const product=ProductModel.add(newProduct);
    //     res.status(201).send(product);
        


    // };

    //Rate Product by model 
    // rateProduct(req, res) {
    //     const userID=req.query.userID;
    //     const productID=req.query.productID;
    //     const rating=req.query.rating;
    //     const error=ProductModel.rateProduct(userID,productID,rating);
    //     if(error){
    //         res.status(400).send(error);
    //     }

    //     return res.status(200).send("Product has been rated successfully");

    // }


    //getone product from product model
    // getOneProduct(req, res) {
    //     const id=req.params.id;
    //     const product=ProductModel.get(id);

    //     if(!product){
    //         return res.status(404).send("product not found");
    //     }else{
    //             res.status(200).send(product).send("Product has been Rated");
    //         }

    // }

    // filterProducts(req,res){
    //     const {minPrice,maxPrice,category}=req.query;
    //     const filteredProducts=ProductModel.filter(minPrice,maxPrice,category);
    //     res.status(200).send(filteredProducts);
    // }


    //calculate average price (aggrigate function)
    async averagePrice(req,res,next){
        try{
            const result=await this.ProductRepository.averageProductPricePerCategory();
            res.status(200).send(result);
        }catch(err){
            console.log(err);
        }
    }

}