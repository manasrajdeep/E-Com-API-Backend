import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"

export default class CartItemRepository{
    constructor() {this.collection="cartItems"};

    async add(product,userId,quantity){
        const db=getDB();
        const collection=db.collection(this.collection);
        
        //Insertion
        const newItems=await collection.insertOne({product:new ObjectId(product),userId:new ObjectId(userId),quantity})

    }

   async get(userID){
    const db=getDB();
    const collection=db.collection(this.collection);
    const getItems=await collection.find({userId:new ObjectId(userID)}).toArray();
    return getItems

   }

   async delete(userID,cartItemId){
    const db=getDB();
    const collection=db.collection(this.collection);
    const deleteItems=await collection.deleteOne({_id:new ObjectId(cartItemId),userID:new ObjectId(userID)});
    return deleteItems.deletedCount>0;
   }
}