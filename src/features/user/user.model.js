import { getDB } from "../../config/mongodb.js";


export default class UserModel{

    constructor(name,email,password,type){
        // this._id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
    }

// //SignUp method
//     static async SignUp(name,email,password,type){
//     //   try{  
//         //1.get a database
//         const db=getDB();
//         //2.Get the collection
//         const collection=db.collection('users');

//         const newUser=new UserModel(
//             // users.length+1,
//             name,email,password,type);
//         // users.push(newUser);

//         //3. Insert the document 
//         await collection.insertOne(newUser);

//         return newUser;
//     //   }catch(err){
//     //     throw new Error('something went wrong in Database',500);

//     //   }
//     }

//SignIn method
    // static SignIn(email,password){
    //     const user=users.find(user=> user.email==email && user.password==password);
    //     // console.log(user);
    //     return user;
    // }
//get all user details 
    static getAll(){
        return users;
    }
}

var users=[{
    id:1,
    name:'admin',
    password:'admin',
    type:'seller',
    email:'admin@admin'
},{
    id:2,
    name:'admin1',
    password:'admin',
    type:'customer',
    email:'admin'
},
{
    id:3,
    name:'Duo',
    password:'Duo1234',
    type:'customer',
    email:'Duo@admin'
},
]