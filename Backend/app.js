import express from "express";
import dotenv from "dotenv";
dotenv.config("./.env");
import cors from "cors";
import connectDb from "./src/config/mongo.config.js";
import short_url from "./src/routes/short_url.route.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorhandler.js";
import auth_routes from "./src/routes/auth.route.js";
import cookieParcer from "cookie-parser";
import { attachUser } from "./src/utils/attachuser.js";
const app = express();
app.use(cookieParcer());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(attachUser);
app.use(cors());
app.use("/api/auth",auth_routes);
app.use("/api/create",short_url);
app.get("/:id",redirectFromShortUrl);
app.use(errorHandler)
app.listen(3000,()=>{
    connectDb();
    console.log("server is running on port 3000");
})
