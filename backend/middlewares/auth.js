import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "NO token provided"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "my_secrect_key");
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).josn({
                message: "User not found"
            });
        }

        req.userId = user._id;
        req.userRole = user.role;

        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Invalid or expire token"
        });
    }

};

export default authMiddleware;