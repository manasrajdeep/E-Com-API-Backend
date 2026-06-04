import jwt from "jsonwebtoken";  

const jwtAuth=(req,res,next)=>{
    //1.Read the token
    const token=req.headers['authorization'];

    //2.if no token, return the error
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    //3.check if token is valid.
    try{
        const payload=jwt.verify(token,"opera-age-labor")
        // console.log("My JWT Payload is:", payload);
        req.userID=payload.userId;
    }
    catch{
        //4.return error.
        return res.status(401).send("Unauthorized");
    }
    //5. call next middleware
    next();
}
export default jwtAuth;
