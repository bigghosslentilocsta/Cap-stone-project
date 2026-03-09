import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config();
export const verifyToken = (req, res, next) => {
    //read the token from req
    let token = req.cookies.token;
    console.log("token: ", token)  
    if (!token) {
        return res.status(401).json({ message: "Token required" })
    }
    //verify the validity of token
    let decodedToken=jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedToken) {
        return res.status(401).json({ message: "Invalid token" })
    }
    //forward the req to next middleware or route handler
    req.user=decodedToken
    next()
};
