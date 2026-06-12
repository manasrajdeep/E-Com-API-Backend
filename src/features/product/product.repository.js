import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "./product.schema.js";
import { categorySchema } from "./category.schema.js";

    const ProductModel=mongoose.model('Product',productSchema)
    const ReviewModel=mongoose.model('Review',reviewSchema)
    const CategoryModel=mongoose.model('Category',categorySchema)
class ProductRepository{
    constructor(){
        this.collection="products"
    }

    async add(newProduct){
        try{
        //get the database
        // const db=getDB();
        // //get the collection 
        // const collection=db.collection(this.collection);
        // //Insert the document
        // await collection.insertOne(newProduct);
        // return newProduct;

        //adding product by mongoose
        //1.Add the product
        newProduct.categories=newProduct.category.split(',').map(e=>e.trim());
        const Product=new ProductModel(newProduct);
        const savedProduct=await Product.save();

        //2.Update categories
        await CategoryModel.updateMany(
            {_id:{$in: newProduct.categories}},
            {
                $push:{products:new ObjectId(savedProduct._id)}
            }
        );
        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500)
        }
    }

    async getAll(){
        try{
            const db=getDB();
            const collection=db.collection(this.collection);
            return await collection.find().toArray();


        }catch(err){
            console.log(err);
            throw new ApplicationError("something is wrong",500)
        }
    }

    async get(id){
        try{
            const db=getDB();
            const collection=db.collection(this.collection);
            return await collection.findOne({_id:new ObjectId(id)});


        }catch(err){
            console.log(err);
            throw new ApplicationError("something is wrong",500)
        }


    }
   
    
    //FilterProducts 
    async filter(minPrice,maxPrice,category){
        try{
            const db=getDB();
            const collection=db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price={$gte:parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price={...filterExpression.price,$lte:parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category=category
            }

            return collection.find(filterExpression).toArray();

        }catch(err){
            console.log(err);
            throw new Error("something went wrong",500);
            
        }
    }

    // //rating if rating already there we will update the rating 
    // async rating(userID,productId,ratings){
    //     try{
    //     const db=getDB();
    //     const collection=db.collection(this.collection);
    //     //1.Find the product
    //     const product=await collection.findOne({_id:new ObjectId(productId)});
    //     //2.Find the rating
    //     const userRating=product?.rating?.find(r=>r.userID==userID);
    //     if(userRating){
    //         //3.Update the rating
    //         console.log(userRating)
    //         await collection.updateOne({
    //             _id:new ObjectId(productId),"rating.userID":new ObjectId(userID)
    //         },{
    //             $set:{"rating.$.ratings":ratings}
    //         })
    //     }else{
    //     await collection.updateOne(
    //         {
    //             _id:new ObjectId(productId)
    //         },
    //         {
    //             $push:{rating:{userID:new ObjectId(userID),ratings}}
    //         }
    //     )}
    // }catch(err){
    //     console.log(err);
    //     throw new ApplicationError('something went wrong',500)

    // }
    // }

    // //#better approach rating if rating already there we will Remove the rating
    // async rating(userID,productId,ratings){
    //     try{
    //     const db=getDB();
    //     const collection=db.collection(this.collection);
        
    //     //1. Remove the existing rating 
    //      await collection.updateOne(
    //         {
    //             _id:new ObjectId(productId)
    //         },
    //         {
    //             $pull:{rating:{userID:new ObjectId(userID)}}
    //         }
    //     )

    //     //Add new rating
    //     await collection.updateOne(
    //         {
    //             _id:new ObjectId(productId)
    //         },
    //         {
    //             $push:{rating:{userID:new ObjectId(userID),ratings}}
    //         }
    //     )
    // }catch(err){
    //     console.log(err);
    //     throw new ApplicationError('something went wrong',500)

    // }
    // }


    //Rating by using mongoose to have multiple rating 
    async rating(userID,productId,ratings){
        try{
            //1.check if products exists
            const productToUpdate=await ProductModel.findById(productId);
            if(!productToUpdate){
                throw new Error("Product not found");
            }
            //2.get the existing review
            const userReview=await ReviewModel.findOne({product:new ObjectId(productId),user:new ObjectId(userID)})
            if(userReview){
                userReview.rating=ratings;
                await userReview.save();
            }
            else{
                const newReview =new ReviewModel({
                    product:new ObjectId(productId),
                    user:new ObjectId(userID),
                    rating:ratings

                })
                newReview.save();
            }
    }catch(err){
        console.log(err);
        throw new ApplicationError('something went wrong',500)

    }
    } 



    async averageProductPricePerCategory(){
        try{
            const db=getDB();
            return await db.collection(this.collection).aggregate([
                {
                    //Stage 1:Get average price per category
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
            ]).toArray();

        }catch(err){
            console.log(err);
        }
    }


}
export default ProductRepository;