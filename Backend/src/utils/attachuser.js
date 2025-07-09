import { verifyToken } from "./helper.js";
import { findUserById } from "../dao/user.dao.js";
export const attachUser = async (req,res,next)=>{
    const tk = req.cookies.token;
    if(!tk) return next();
    try {
        const decoded = await verifyToken(tk);
        const user= await findUserById(decoded.id);
        if(!user) return next();
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        next();
    }
}