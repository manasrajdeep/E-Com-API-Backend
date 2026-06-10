import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"


export default class OrderRepository{

    constructor(){
        this.collection="orders";
    }

    async placeOrder(userId){
        
        //1.Get cartItems and calculate total amount.
          await this.getTotalAmount(userId);


        //2.Create an order record

        //3.Reduce the stock.

        //4 Clear the cart Items


    }
    async getTotalAmount(userId){
        const db=getDB();

       const items= await db.collection("cartItems").aggregate([
            //1.Get cart items for the user
            {
                $match:{userId:new ObjectId(userId)}
            },
            {
                //2.Get the products from products collection
                $lookup:{
                    from:"products",
                    localField:"product",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            {
                //3.Unwind the productInfo
                $unwind:"$productInfo"
            },
            {
                //4.Calculate totalAmount for each cartItems
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    }
                }
            }
        ]).toArray();
       const finaltotalAmount=items.reduce((acc,item)=>acc+item.totalAmount,0);
       console.log(finaltotalAmount);
       console.log(items);
    }
}