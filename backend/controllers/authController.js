import User from "../models/User.js";
import bcrypt from 'bcrypt';
import generateToken from "../utills/generateToken.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || name.trim() === "") {
            res.status(400).json({
                message: "name is required"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "email already exist"
            })
        }

        const emailRegex = /^[^/s@]+@[^/s@]+.[^/s@]+$/;
        if (!emailRegex) {
            res.status(400).json({
                message: "name is required"
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(400).json({
            message: "user create successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password
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

        const user = await User.findOne({ email });


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

        const token = generateToken(user._id);
        res.status(200).json({
            message: "Login successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }
        })



    } catch (error) {
        res.status(500).json({
            message: ("Server error", error.message)
        })

    }

}