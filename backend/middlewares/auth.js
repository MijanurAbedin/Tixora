 import jwt from "jsonwebtoken";
 const  authMiddleware = (req, res,next)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message:"NO token provided"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,"my_secrect_key");

        req.useId = decoded.userId;
        next();

    }catch(error){
        console.log(error.name,error.message);
        return res.status(401).json({
            message:"Invalid or expire token"
        });
    }

 };

 export default  authMiddleware;