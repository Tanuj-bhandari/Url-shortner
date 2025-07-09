import { verifyToken } from "../utils/helper.js";
import { findUserById } from "../dao/user.dao.js";

export const authmiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:"Unauthorized"});
    try {
        const decoded = await verifyToken(token);
        console.log(decoded);
        const user= await findUserById(decoded);
        if(!user) return res.status(401).json({message:"Unauthorized"});
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized"});
    }
}