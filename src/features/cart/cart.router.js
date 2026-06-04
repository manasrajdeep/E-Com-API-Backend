import express from 'express';
import { cartItemController } from './cart.controller.js';

const cartRouter=express.Router();

const cartController=new cartItemController();

cartRouter.post('/',cartController.add);
cartRouter.get('/',cartController.get);
cartRouter.delete('/:id',cartController.delete);

export default cartRouter;