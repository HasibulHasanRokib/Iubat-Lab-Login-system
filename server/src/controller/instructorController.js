const InstructorModel = require("../model/instructorModel");
const StudentModel=require('../model/studentModel');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt=require('jsonwebtoken');
const { JWT_ACCESS_KEY } = require("../config/config");


const instructorSignUp=async(req,res)=>{
    try {
       const {name,email,password,confirmPassword}=req.body;
       
       if(!name || !email || !password ||!confirmPassword){
        return res.status(401).json({success:false,message:"Fill all field!"})
       }

       const instructorExist=await InstructorModel.findOne({email:email})

       if(instructorExist){
        return res.status(401).json({success:false,message:"You are already register!"})

       }

       const newInstructor=await InstructorModel({name,email,password:bcrypt.hashSync(password,salt),confirmPassword:bcrypt.hashSync(confirmPassword,salt)})
       
       await newInstructor.save();       
       res.status(201).json({success:true,message:"Registration successful."})
       
    } catch (error) {
        return res.status(500).json({success:false,message:"Registration failed!"})

    }
}

const instructorSignIn=async(req,res)=>{
    try {
    const {email,password}=req.body

    const validUser=await InstructorModel.findOne({email:email})

    if(!validUser){
        return res.status(401).json({success:false,message:"Only instructor can access this!"})
    }

    const passOk=bcrypt.compareSync(password,validUser.password)

    if(!passOk){
        return res.status(401).json({success:false,message:"Only instructor can access this!"})
    }

    const token=jwt.sign({id:validUser._id},JWT_ACCESS_KEY)

    const{password:pass,confirmPassword:cPass,...rest}=validUser._doc;


    res.cookie('accessToken',token,{httpOnly: true, secure: true}).json({success:true,message:"Login successful.",rest})
        

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const instructorSignOut=async(req,res)=>{
    try {
       
       const password=req.body.password;

       if(!password){
        return res.status(401).json({success:false,message:"Password required."})  
       }
       const id=req.instructorId;
       const user=await InstructorModel.findOne({_id:id})

       const passOk=bcrypt.compareSync(password,user.password)
       console.log(passOk)

      if(!passOk){
        return res.status(401).json({success:false,message:"Wrong credentials"})  
      }

        const student=await StudentModel.find({isLoggedIn:true})
       
        if(student.length > 0){
            student.forEach(async(user)=>{
                user.isBanned=true;
                user.isLoggedIn=false;
                await user.save();
            })
        }
       
        
        res.clearCookie('accessToken').json({success:true,message:"Logout successful."})

    } catch (error) {
        console.log(error.message)
    }
}
module.exports={instructorSignUp,instructorSignIn,instructorSignOut}