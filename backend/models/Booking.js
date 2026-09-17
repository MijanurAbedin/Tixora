import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    concert:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Concert",
        require:true
    },
    seats:{
        type:Number,
        require:true,
        mim:1
    },
    totalPrice:{
        type:Number,
        require:true,
    },

    status:{
        type:String,
        enum:[ "pending","confirmed","cancelled "],
        default:"pending"
    }
},
{
    timestamps:true
})

const Booking = mongoose.model("Booking",bookingSchema);

export default Booking;