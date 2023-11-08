const mongoose=require('mongoose')

const instructorSchema= new mongoose.Schema({
    name:{
    type:String,
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true    
    },
   
},{timestamps:true})

const InstructorModel=mongoose.model("instructors",instructorSchema)

module.exports=InstructorModel;