import jwt from 'jsonwebtoken';

const generateToken = (userId)=>{
    return jwt.sign(
        {userId},
        "my_secrect_key",
        {expiresIn: "1d"}

    );
};

export default generateToken;