import User from "../models/User.js";
import bcrypt from 'bcrypt';
import generateToken from "../utills/generateToken.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || name.trim() === "") {
            res.status(400).json({
                message: "name is required"
            })
        }

        const emailRegex = /^[^/s@]+@[^/s@]+.[^/s@]+$/;
        if (!emailRegex) {
            res.status(400).json({
                message: "Please enter a valid email"
            })
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });
        if (existingUser) {
            res.status(400).json({
                message: "email already exist"
            })
        }





        if (!password) {
            res.status(400).json({
                message: "password is required"
            })
        }

        if (password.length < 10) {
            res.status(400).json({
                message: "Password must be 10 charecter"
            })

        }
        if (!/[A-Z]/.test(password)) {
            res.status(400).json({
                message: "Password must be atleast one upper case letter"
            })
        }
        if (!/[0-9]/.test(password)) {
            res.status(400).json({
                message: "Password must be atleast one number"
            })
        }
        if (!/[!@#$%^&*]/.test(password)) {
            res.status(400).json({
                message: "Password must be atleast one special letter"
            })
        }

        if(role === "superadmin"){
            return res.status(403).json({
                message:"Superadmin signup is not allowed"
            })
        }

          let userRole = "user";
        let approvalStatus = "not_required";
        if (role === "organizer") {
          
            approvalStatus = "pending"

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: userRole,
            approvalStatus

        })
        res.status(201).json({
            message: 
            role ==="organizer"?"Accoount created. You can now apply for organizer approval":"User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                approvalStatus: user.approvalStatus

            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error"
        })
    }


}




export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and passsword are required"
            })
        }
        const user = await User.findOne({ email:email.toLowerCase().trim() });


        if (!user) {
            res.status(400).json({
                message: "Please Enter a valid email or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({
                message: "incorrect password"
            })
        }

        if (user.role === "organizer" && user.approvalStatus !== "approved") {
            return res.status(403).json({
                message: `organizer account is ${user.approvalStatus}`
            })
        }

        const token = generateToken(user._id);
        res.status(200).json({
            message: "Login successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                approvalStatus: user.approvalStatus,
                token: token
            }
        })



    } catch (error) {
        res.status(500).json({
            message: ("Server error", error.message)
        })

    }

}