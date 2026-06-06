import { ObjectId } from "mongodb";
import cartItemModel from "./cart.model.js";
import CartItemRepository from "./cart.repository.js";

export class cartItemController{
    constructor(){
        this.cartItemRepository=new CartItemRepository();
    }

    //from card repository
   async add(req,res){
        const {product, quantity} =req.body;
        const userId=req.userID;
        console.log(quantity)
        await this.cartItemRepository.add(product,userId,quantity);
        res.status(201).send("Cart is Updated");
    }


    // //this is for card model
    // add(req,res){
    //     const {product, quantity} =req.query;
    //     const userId=req.userID;
    //     console.log(userId);
    //     cartItemModel.add(product,userId,quantity);
    //     res.status(201).send("Cart is Updated");
    // }

    //this is for card Repository
    async get(req,res){ 
        const userID=req.userID;
        const cartItems=await this.cartItemRepository.get(userID);
        return res.status(200).send(cartItems);
    }

    // //this is for card model
    // get(req,res){ 
    //     const userID=req.userID;
    //     const cartItems=cartItemModel.get(userID);
    //     console.log(cartItems);
    //     console.log(userID);
    //     return res.status(200).send(cartItems);

    // }

    //this is from card repository
    async delete(req,res){
        const userId=req.userID;
        const cartItemId=req.params.id;
        const isDeleted=this.cartItemRepository.delete(userId,cartItemId);
        if(!isDeleted){
            return res.status(404).send("Item not found");
        }
       return res.status(200).send("Deleted successfuly")
    }

    // //this is for card model
    // delete(req,res){
    //     const userId=req.userID;
    //     const cartItemId=req.params.id;
    //     const error=cartItemModel.delete(cartItemId,userId);
    //     if(error){
    //         return res.status(404).send(error);
    //     }
    //    return res.status(200).send("Deleted successfuly")
    // }
}