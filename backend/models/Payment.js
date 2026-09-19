import mongoose from "mongoose";
import { type } from "os";


const paymentSchema = new mongoose.Schema({

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    provider:{
        type:String,
        default:"razorpay"
    },
    orderId:{
        type:String
    },
    paymentId:{
        type:String
    },
    status:{
        type:String,
        enum:["pending", "paid", "failed" ],
        default:"pending"
    }
},
{timestamps:true}
);

const Payment  = mongoose.model("Payment",paymentSchema);

export default Payment;