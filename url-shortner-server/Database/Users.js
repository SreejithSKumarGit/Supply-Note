const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    urls:[{long:String,
            short:String,
            calls:{type:Number,default:0}}]
})

const Users=mongoose.model("User",userSchema);

module.exports=Users;