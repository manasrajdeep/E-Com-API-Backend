import UserModel from "./user.model.js"; 
import jwt from "jsonwebtoken";  
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class UserController {

    constructor(){
        this.UserRepository=new UserRepository();
    }

    //calling from model
//    async signUp(req,res){
//         const {name,email,password,type}=req.body;
//         const newUser=await UserModel.SignUp(name,email,password,type);
//         res.status(201).send(newUser);
//     }

//calling Signup function from userRepository
   async signUp(req,res){
        const {name,email,password,type}=req.body;
        //hashing the password
        const hashedPassword=await bcrypt.hash(password,12);

        const newUser=new UserModel(name,email,hashedPassword,type);
        await this.UserRepository.SignUp(newUser);
        res.status(201).send(newUser);
    }



//user model signIn 
//  signIn(req,res){
//         // const {email,password}=req.body;
//          console.log(req.body);
//         const user=UserModel.SignIn(req.body.email,req.body.password);
//         // console.log(user);

//         if(!user){
//             return res.status(400).send("Incorrect credentials")
//         }else{
//             //1.Create Token
//             const token=jwt.sign({userId:user.id, email:user.email},"opera-age-labor",{expiresIn:'1h'})
//             //2.Send Token
//             return res.status(200).send("Logged in successfully.Token-"+token);
//         }
//     }

// User Repository SignIn
// async signIn(req,res){
//         // const {email,password}=req.body;
//          console.log(req.body);
//         const user=await this.UserRepository.SignIn(req.body.email,req.body.password);
//         // console.log(user);

//         if(!user){
//             return res.status(400).send("Incorrect credentials")
//         }else{
//             //1.Create Token
//             const token=jwt.sign({userId:user.id, email:user.email},"opera-age-labor",{expiresIn:'1h'})
//             //2.Send Token
//             return res.status(200).send("Logged in successfully.Token-"+token);
//         }
//     }


//SignIn while using Hashing 
async signIn(req,res){

    try{
        //1.find user by email 
        const user=await this.UserRepository.findByEmail(req.body.email);
        
        if(!user){
            return res.status(400).send("Incorrect credentials")
        }else{
            //compare password with hashed password
            const result=await bcrypt.compare(req.body.password,user.password);
            if(result){
                //1.Create Token
            const token=jwt.sign({userId:user._id, email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})
            //2.Send Token
            return res.status(200).send("Logged in successfully.Token-"+token);
            }else{
                return res.status(400).send("Incorrect credentials")
            }
        }
    }catch(err){
        throw new ApplicationError("something went wrong",500);
    }
}
}