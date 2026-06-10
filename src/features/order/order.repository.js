import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"
import OrderModel from "./order.model.js";

export default class OrderRepository{

    constructor(){
        this.collection="orders";
    }

    async placeOrder(userId){
       try{ 
        const db=getDB();

        //1.Get cartItems and calculate total amount.
        const items = await this.getTotalAmount(userId);
        const finaltotalAmount=items.reduce((acc,item)=>acc+item.totalAmount,0);
        console.log(finaltotalAmount);
       
        //2.Create an order record.
        const newOrder = new OrderModel(new ObjectId(userId),finaltotalAmount,new Date());
        db.collection(this.collection).insertOne(newOrder);
        

        //3.Reduce the stock.
        for(let item of items){
            await db.collection("products").updateOne(
                {_id:item.productID},
                {$inc:{stock:-item.quantity}}
            )
        }
        throw new Error("Something is wrong i placeOrder");
        
        //4 Clear the cart Items.
        await db.collection("cartItems").deleteMany({
            userId: new ObjectId(userId)
        });
        return;

       }catch(err){
        console.log(err);
       }
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
        return items;
    }
    }