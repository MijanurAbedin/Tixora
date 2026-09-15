import express from'express';
import { login, signup } from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();


 router.post("/signup", signup);
 router.post("/login",login);

 router.get("/events",authMiddleware,(req,res)=>{
    res.status(200).json({
        message:"Events get successfully"
    })
 })



export default router;