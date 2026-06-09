import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/mongodb.js"

export default class CartItemRepository{
    constructor() {this.collection="cartItems"};

    async add(product,userId,quantity){
        const db=getDB();
        const collection=db.collection(this.collection);
        const id=await this.getNextCounter(db);

        //find the document
        //either insert or update
        await collection.updateOne(
            {product:new ObjectId(product),userId:new ObjectId(userId),quantity},
            {   $setOnInsert:{
                _id:id},
                $inc:{
                quantity:quantity
            }},
            {upsert:true}
        )

        // //Insertion
        // const newItems=await collection.insertOne({product:new ObjectId(product),userId:new ObjectId(userId),quantity})

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
   async getNextCounter(db){
    const resultDocument=await db.collection("counters").findOneAndUpdate(
        {
            _id:'cartItemId'
        },
        {
            $inc:{value:1}
        },
        {returnDocument:'after'}
    )
    console.log(resultDocument)
    console.log(resultDocument.value)

    return resultDocument.value;
   }
}