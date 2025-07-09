import wrapAsync from "../utils/trycatchwrapper.js";
import { registerUser ,loginUser} from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";
import { signToken } from "../utils/helper.js";

export const register_user = wrapAsync( async(req,res)=>{
     const {name,email,password} = req.body;
     const {token,user} = await registerUser(name,email,password);
     req.user= user;
     res.cookie("token",token,cookieOptions);
     res.status(200).json({message:"register success"})
    

    })
export const login_user = wrapAsync(async(req,res)=>{
    const {email,password} = req.body;
    const {token,user} = await loginUser(email,password);

    req.user=user;
    res.cookie("token",token,cookieOptions);
    res.status(200).json({message:"login success"})
})