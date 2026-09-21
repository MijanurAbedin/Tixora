import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","organizer","superadmin"],
        default:"user"
    },
    approvalStatus:{
        type:String,
        enum:["not_required","pending","approved","rejected"],
       default:"not_required"
    }
},
{
    timestamps:true


})

const User =  mongoose.model("User",userSchema);

export default User;