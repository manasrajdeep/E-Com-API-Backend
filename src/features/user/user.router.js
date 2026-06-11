import express from "express";
import UserController from "./user.controller.js";
import bodyParser from 'body-parser';
import jwtAuth from "../../middlewares/jwt.middleware.js";

const UserRouter=express.Router();
UserRouter.use(bodyParser.json());

const userController=new UserController();

UserRouter.post('/signup',(req,res)=>{
    userController.signUp(req,res)
});
UserRouter.post('/signin',(req,res)=>{
    userController.signIn(req,res)
});
UserRouter.put('/resetPassword',jwtAuth,(req,res,next)=>{
    userController.resetPassword(req,res,next)
});
export default UserRouter