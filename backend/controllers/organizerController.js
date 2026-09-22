import OrganizerApplication from "../models/OrganizerApplication.js";

export const applyForOrganizer = async (req, res) => {
    try {
        const userId = req.userId;

        const { groupName, description, teamMembers, phone, website, socialLinks } = req.body;

        if (!groupName || !description || !phone) {
            return res.status(400).json({
                message: "Group name, description and phone number are required"
            })
        }

        const exsistingApplication = await OrganizerApplication.findOne({ user: userId })
        if (exsistingApplication) {
            return res.status(400).json({
                message: "Organizer application already exists"
            })
        }
        const application = await OrganizerApplication.create({
            user: userId,
            groupName,
            description,
            teamMembers,
            phone,
            website,
            socialLinks

        })
        return res.status(201).json({
            message: "Organizer application submite succesfully",
            application
        })



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });

    }
}

export const getMyOrganizerApplication = async (req,res)=>{
    try{
 const application = await OrganizerApplication.findOne({
    user:req.userId
 })

 if(!application){
    return res.status(400).json({
        message:"Organizer application not found"
    });
 }
 return res.status(200).json({
    application
 })

    }catch(error){
        console.log(error);
console.error(error);
return res.status(500).json({
    message:"Server error"
})
    }
}