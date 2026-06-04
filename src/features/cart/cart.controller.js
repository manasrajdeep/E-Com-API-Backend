import cartItemModel from "./cart.model.js";

export class cartItemController{
    add(req,res){
        const {product, quantity} =req.query;
        const userId=req.userID;
        console.log(userId);
        cartItemModel.add(product,userId,quantity);
        res.status(201).send("Cart is Updated");
    }

    get(req,res){ 
        const userID=req.userID;
        const cartItems=cartItemModel.get(userID);
        console.log(cartItems);
        console.log(userID);
        return res.status(200).send(cartItems);

    }
    delete(req,res){
        const userId=req.userID;
        const cartItemId=req.params.id;
        const error=cartItemModel.delete(cartItemId,userId);
        if(error){
            return res.status(404).send(error);
        }
       return res.status(200).send("Deleted successfuly")
    }
}