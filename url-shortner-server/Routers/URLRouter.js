const express=require("express");
const { getURLs, addURLs, navigateURL } = require("../Handlers/urlHandler");

const URLRouter=express.Router();

URLRouter.get("/shortURLs",getURLs);
URLRouter.post("/shortenURL",addURLs);
URLRouter.get("/navigate/:short",navigateURL);

module.exports=URLRouter;