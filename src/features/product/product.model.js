import { request } from "express";
import UserModel from "../user/user.model.js";

export default class ProductModel {

    constructor(name, desc, price, imageUrl, category, sizes,id) {
        

        this._id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;

    }

    static add(product) {
        product.id = products.length + 1;
        products.push(product);
        return product;
    }

    static get(id){
        const product=products.find(product=>product.id==id);
        return product; 
    }

    static filter(minPrice,maxPrice,category){
        const result= products.filter((product)=>{
            return(
             (!minPrice || product.price>=minPrice) &&
             (!maxPrice || product.price<=maxPrice) && 
             (!category || product.category==category)
               
               
                
            )
        })
        return result;
    }


    static getAll() {
        return products;
    }


    //RateProducts after login
    static rateProduct(userID,productID,rating){ 

        
        //1.validate user & product

       const user= UserModel.getAll().find((u)=>u.id==userID);
        if(!user){
            return 'User not found';
        }

        //2.Validate Product
       const product= products.find(p=>p.id==productID);
        if(!product){
            return 'Product not found';
        }

        //3. Check if there are any ratings and if not then add ratings array.  

        if(!product.ratings){
            product.ratings =[];
            product.ratings.push({
                userID:userID,
                rating:rating
            });
        }
            else{
                //4.check if user rating is already available 
                const existingRatingIndex = product.ratings.findIndex((r)=>r.userID==userID);
                if(existingRatingIndex >=0){
                    product.ratings[existingRatingIndex]={
                        userID:userID,
                        rating:rating
                    };

                }else{
                    //if no existing rating,then add new rating
                    product.ratings.push({
                        userID:userID,
                        rating:rating
                    });
                }

            }

        
        

    }
}



var products =  [
    new ProductModel(1, 'Product 1', 'Description for product 1', 10.99, 'https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F814423752%2Fphoto%2Feye-of-model-with-colorful-art-make-up-close-up.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3Dl15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fphoto-image-art&docid=OXKLe4iBQZF6GM&tbnid=YolU_Gbg6B25iM&vet=12ahUKEwik0v2-oMeUAxXnxjgGHYijK68QnPAOegQIHxAB..i&w=612&h=408&hcb=2&ved=2ahUKEwik0v2-oMeUAxXnxjgGHYijK68QnPAOegQIHxAB','Category of product 1'),
    new ProductModel(2, 'Product 2', 'Description for product 2', 12.99,'https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F81','Category of product 2',10)
    
]