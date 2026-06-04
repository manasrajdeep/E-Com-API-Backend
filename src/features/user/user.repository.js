import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


class UserRepository{
    async SignUp(newUser){
        try{
            //get the database
            const db= getDB();
            //get the collection
            const collection=db.collection('users');
            //Insert the document 
            await collection.insertOne(newUser);
            return newUser


        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong",500);
        }

    }

    // //Signin
    //   async SignIn(email,password){
    //     try{
    //         //get the database
    //         const db= getDB();
    //         //get the collection
    //         const collection=db.collection('users');
    //         //Find the document 
    //         return await collection.findOne({email,password});
    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong",500);
    //     }

    // }

    // for using hasing the password
        //Signin
      async findByEmail(email){
        try{
            //get the database
            const db= getDB();
            //get the collection
            const collection=db.collection('users');
            //Find the document 
            return await collection.findOne({email});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong",500);
        }

    }
}

export default UserRepository;