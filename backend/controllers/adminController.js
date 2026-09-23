import OrganizerApplication from "../models/OrganizerApplication.js";
import User from "../models/User.js"


export const getPendingApplication = async (req, res) => {


    try {
const applications = await OrganizerApplication.find({
    status:"pending"
}).populate("user","name email").sort({ createdAt: -1});

return res.status(200).json({
    count:applications.length,
    applications
});


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            Message:"server errror"
        });
    }
}

export const updateApplicationStatus = async (req,res)=>{

try{
const { status } = req.body;
const { id } = req.params;


if(!["approved","rejected"].includes(status)){
    return res.status(400).json({
        message: "Status must be approved or rejected"
    })
}

const application = await OrganizerApplication.findById(id);

if(!application){
    return res.status(404).json({
        message: " Application has already been reviewed"
    })
}
application.status = status;
await application.save();

if(status === "approved"){
    await User.findByIdAndUpdate(application.user,{
        role: "roganizer",
        approvalStatus: "approved"
    });
}else{
    await User.findByIdAndDelete(application.user,{
        approvalStatus: "rejected"
    });
}

return  res.status(200).json({
    message: `Application ${status} successfully`,
    application
})

}catch(error){
    console.log(error);
    return res.status(500).json({
        message: "Server error"
    });
}

};