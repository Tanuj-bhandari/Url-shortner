import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl,getCustomShortUrl } from "../dao/short_url.js";
export const createshortUrlWithoutUser= async(url)=>{
    console.log(url);
    const short_Url =  generateNanoId(7);
    if(!short_Url) throw new Error("short url not generated");
    await saveShortUrl(short_Url,url)
    return short_Url ;
}

export const createshortUrlWithUser= async(url,userId,slug=null)=>{
    
    console.log(slug);
    const short_Url = slug ||  generateNanoId(7);
    console.log(short_Url)
    const exist = await getCustomShortUrl(short_Url);
    if(exist) throw new Error("this custom url already exists");
    
    await saveShortUrl(short_Url,url,userId)
    return short_Url ;
}