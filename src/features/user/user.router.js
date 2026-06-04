import express from "express";
import UserController from "./user.controller.js";
import bodyParser from 'body-parser';

const UserRouter=express.Router();
UserRouter.use(bodyParser.json());

const userController=new UserController();

UserRouter.post('/signup',(req,res)=>{
    userController.signUp(req,res)
});
UserRouter.post('/signin',(req,res)=>{
    userController.signIn(req,res)
});

export default UserRouter