import mongoose  from "mongoose";

const eventSchema = new mongoose.Schema({

    title:{
        type: String,
        require:true
    },
    artist:{
        type:String,
        retuire:true
    },
    description:{
        type:String,
        require:true
    },
    venue:{
        type:String,
        require:true 
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    totalSeats:{
        type:Number,
        require:true
    },
    availableSeats:{
        type:Number,
        require:true
    },
    image:{
        type:String
    }

},
{
    timestamps:true 
})

const Concert = mongoose.model("Concert",eventSchema);

export default Concert;
