import * as userdao from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorhandler.js";
import { signToken } from "../utils/helper.js";


export const registerUser = async(name,email,password)=>{
    const user = await userdao.findUserByEmail(email);
    if(user) throw new ConflictError("User already exists");
    const newUser = await userdao.createUser(name,email,password);
    const token = await signToken({id:newUser._id});
    return {token,user:newUser};
}

export const loginUser = async(email,password)=>{
    const user = await userdao.findUserByEmail(email);
    
    if(!user || user.password !== password) throw new Error("Invalid credentials");
    const token = await signToken({id:user._id});
    return {token,user};
}