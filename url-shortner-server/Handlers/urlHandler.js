const Users=require("../Database/Users");
const jwt = require('jsonwebtoken');
const shortId = require('shortid')
var shortUrl = require("node-url-shortener");

async function getURLs(req,res,next)
{
    const token =req.headers["x-access-token"]

    try {
        const decoded=jwt.verify(token,"secret123");
        const email=decoded.email;
        const user=await Users.findOne({email:email});
        return res.json({status:"ok",urls:user.urls})
    } catch (error) {
        res.json({status:"ok",error:"Invalid Token"});
    }
}
async function addURLs(req,res,next)
{
    const token =req.headers["x-access-token"]

    try {
        const decoded=jwt.verify(token,"secret123");
        const email=decoded.email;
        const user=await Users.findOne({email:email});
        const short=shortId.generate();
        console.log(short);
        user.urls.push({long:req.body.long,short:short,calls:0})
        user.save();
        return res.status(200).json({status:"ok"})
    } catch (error) {
        return res.status(400).json({status:"Invalid token"})
    }
}
async function navigateURL(req,res,next)
{
    const token =req.headers["x-access-token"]

    try {
        const decoded=jwt.verify(token,"secret123");
        const email=decoded.email;
        const user=await Users.findOne({email:email});
        
        for(var i=0;i<user.urls.length;i++)
        {
            if(user.urls[i].short==req.params.short)
            {
                user.urls[i].calls++;
                user.save();
                return res.status(200).json({long:user.urls[i].long})
                
            }
        }
        return res.status(400).json({status:"error"})
    } catch (error) {
        return res.status(400).json({status:"Invalid token"})
    }
}

module.exports={
    getURLs,addURLs,navigateURL
}


