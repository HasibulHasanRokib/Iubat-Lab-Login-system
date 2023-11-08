const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
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
    }

},{timestamps:true})

const AdminModel=new mongoose.model("admin",adminSchema)

module.exports=AdminModel;