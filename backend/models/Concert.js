import mongoose  from "mongoose";

const ConcertSchema = new mongoose.Schema({

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
    },
    organizer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true 
})

const Concert = mongoose.model("Concert",ConcertSchema);

export default Concert;
