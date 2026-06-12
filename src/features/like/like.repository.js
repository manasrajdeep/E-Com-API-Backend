import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";



const LikeModel=mongoose.model('Like',likeSchema);


export class LikeRepository{


    async getLikes(type,id){
        return await LikeModel.find({
            likeable:new ObjectId(id),
            types:type
        }).populate('user').populate({path:'likeable',model:type})
    }

    async likeProduct(userID,productId){
        console.log("user"+userID);
        try{
            const newLike=new LikeModel({
                user:new ObjectId(userID),
                likeable:new ObjectId(productId),
                types:'Product'
            });
            await newLike.save();

        }catch(err){
            console.log(err);
        }
    }


      async likeCategory(userID,categoryId){
        try{
            const newLike=new LikeModel({
                user:new ObjectId(userID),
                likeable:new ObjectId(categoryId),
                types:'Category'
            });
            await newLike.save();

        }catch(err){
            console.log(err);
        }
    }



}