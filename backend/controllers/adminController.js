import OrganizerApplication from "../models/OrganizerApplication.js";

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