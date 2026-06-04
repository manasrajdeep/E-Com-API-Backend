import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository{
    constructor(){
        this.collection="products"
    }

    async add(newProduct){
        try{
            //get the database
        const db=getDB();
        //get the collection 
        const collection=db.collection(this.collection);
        //Insert the document
        await collection.insertOne(newProduct);
        return newProduct;
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

    //rating
    async rating(userID,productId,ratings){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        const result=collection.updateOne(
            {
                _id:new ObjectId(productId)
            },
            {
                $push:{rating:{userID,ratings}}
            }
        )
    }catch(err){
        console.log(err);
        throw new ApplicationError('something went wrong',500)

    }
    }


}
export default ProductRepository;