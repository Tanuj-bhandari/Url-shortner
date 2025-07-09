import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:false,
        //add gravatar by default
        default:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    }
});

const user = mongoose.model("User", userSchema);

export default user;