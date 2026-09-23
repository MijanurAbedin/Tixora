import OrganizerApplication from "../models/OrganizerApplication.js";

export const applyForOrganizer = async (req, res) => {
    try {
        const userId = req.userId;

        const { groupName, description,teamMembers, phone, website,socialLinks } = req.body;


let parsedTeamMembers = req.body.teamMembers;
let parsedSocialLinks  =req.body.socialLinks;

try{
if(typeof parsedTeamMembers === "string"){
    parsedTeamMembers = JSON.parse(parsedTeamMembers);
}

if(typeof parsedSocialLinks === "string"){
    parsedSocialLinks = JSON.parse(parsedSocialLinks);
}


}catch(error){
    return res.status(500).json({
        message:"invalid team Members or  socialLinks JSON"
    })
}


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

        const uploadedDocuments = req.files?.map((file)=>({
          originalName:file.originalName,
          fileName:file.fileName,
          filePath:file.path,
          mimeType:file.mimeType
        })) || [];

        const application = await OrganizerApplication.create({
            user: userId,
            groupName,
            description,
            teamMembers:parsedTeamMembers,
            phone,
            website,
            socialLinks: parsedSocialLinks,
            documents: uploadedDocuments

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
return res.status(500).json({
    message:"Server error"
})
    }
}