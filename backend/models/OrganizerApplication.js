import mongoose from "mongoose";

const OrganizerApplicationSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    groupName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    teamMembers: [
        {

            name: {
                type: String,
                required: true,
                trim: true
            },
            role: {
                type: String,
                required: true,
                trim: true

            }
        }
    ],
    phone: {
        type: String,
        required: true,
        trim: true
    },

    website:{
        type:String,
        trim:true
    },
    socialLinks:{
     instagram:String,
     facebook:String,
     youtube:String
    },
    status:{
        type:String,
        enum:["pending", "approved", "rejected"],
        default:"pending"
    },
    adminRemarks:{
        type:String,
        trim:true
    }
},
{
    timestamps:true
})

const OrganizerApplication = mongoose.model("OrganizerApplication",OrganizerApplicationSchema);

export default OrganizerApplication;