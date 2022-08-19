const Users=require("../Database/Users");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function signup(req,res,next)
{
    try {
        const newPassword=await bcrypt.hash(req.body.password,10)
        await Users.create({
            name:req.body.name,
            email:req.body.email,
            password:newPassword,
            urls:[]
        })
        res.status(200).json({status:'ok'})
    } catch (error) {
        res.status(400).json({status:"error"})
    }
}

async function login(req,res,next)
{   
    
    const user=await Users.findOne({email:req.body.email})
    
    if(!user)
    {
        return res.status(400).json({status:"error", message:"Invalid Login"})
    }
    
    const isPasswordValid=await bcrypt.compare(req.body.password,user.password);
    
    if(isPasswordValid)
    {
        const token=jwt.sign({
            name:user.name,
            email:user.email
        },"secret123");
        return res.status(200).json({status:"ok",user:token})
    }
    else
    {
        return res.status(400).json({status:"error",message:"Enter valid password"})
    }
}


module.exports={signup,login}