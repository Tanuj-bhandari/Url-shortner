import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { createShortUrl } from '../api/shortUrl.api';

const UrlForm = () => {
  const [url,setUrl]= useState("");
  const [shortUrl,setShortUrl]= useState("");
  const[copied,setCopied]= useState(false);
 const handleSubmit = async(e)=>{
   e.preventDefault();
  const short = await createShortUrl(url);
   setShortUrl(short)
 }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
   
      <>
      <form onSubmit={(e)=>{handleSubmit(e)}} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your URL
          </label>
          <input
            onInput={(event)=>setUrl(event.target.value)}
            type="url"
            id="url"
            value={url}
            required
            placeholder="https://example.com/very-long-url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            
          />
        </div>

    

        <button
         
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          Shortern Url
        </button>
      </form>

     {shortUrl && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-800 mb-2">Your shortened URL:</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      </>
  )



    
 
   

}

export default UrlForm