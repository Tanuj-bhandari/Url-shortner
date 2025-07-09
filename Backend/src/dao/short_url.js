import urlSchema from '../models/short_url.model.js';
import { ConflictError } from '../utils/errorhandler.js';

import mongoose from 'mongoose';
export const saveShortUrl = async (short_Url,long_Url,userId)=>{
    
       try{
         const newUrl = new urlSchema({
            full_url:long_Url,
            short_url:short_Url,
        })

        if(userId){ newUrl.user = userId;
        }
        await newUrl.save();
       }catch(err){
        console.log(err.message);
        throw new ConflictError(err);
       }
};


export const getShortUrl = async (short_Url)=>{
    
    return await urlSchema.findOneAndUpdate({short_url:short_Url},{$inc:{clicks:1}}).populate("user");
}

export const getCustomShortUrl = async (slug)=>{
    
    return await urlSchema.findOne({short_url:slug});
}