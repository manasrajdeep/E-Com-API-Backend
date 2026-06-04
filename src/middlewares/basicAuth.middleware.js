import UserModel from "../features/user/user.model.js";


const basicAuthorizer =(req,res,next)=>{

    //1.check if authorizer header is empty
    const authHead=req.header("authorization");
    console.log(authHead);
    if(!authHead){
        return res.status(401).send("No authorization details found")
    }

    //2.Extract Credentials.[Basic qdsvuhcvdskvdsi]
    const basic64Cred=authHead.replace('Basic ','');
    console.log(basic64Cred);

    //3.decode credentials
    const decodeCred=Buffer.from(basic64Cred,'base64').toString('utf8');
    console.log(decodeCred);
    const creds=decodeCred.split(':');

    //4.Find user exists
    const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
    if(user){
        
        next();
    }else{
        return res.status(401).send('Incorrect Credentails');
    }



}
export default basicAuthorizer;