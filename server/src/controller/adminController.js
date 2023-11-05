const AdminModel = require("../model/adminModel");
const StudentModel=require('../model/studentModel');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt=require('jsonwebtoken');
const { JWT_ACCESS_KEY } = require("../config/config");


const adminSignUp=async(req,res)=>{
    try {
       const {name,email,password,confirmPassword}=req.body;
       
       if(!name || !email || !password ||!confirmPassword){
        return res.status(401).json({success:false,message:"Fill all field!"})
       }

       const adminExist=await AdminModel.findOne({email:email})

       if(adminExist){
        return res.status(401).json({success:false,message:"You are already register!"})

       }

       const newAdmin=await AdminModel({name,email,password:bcrypt.hashSync(password,salt),confirmPassword:bcrypt.hashSync(confirmPassword,salt)})
       
       await newAdmin.save();       
       res.status(201).json({success:true,message:"Registration successful."})
       
    } catch (error) {
        return res.status(500).json({success:false,message:"Registration failed!"})

    }
}

const adminSignIn=async(req,res)=>{
    try {
    const {email,password}=req.body

    const validUser=await AdminModel.findOne({email:email})

    if(!validUser){
        return res.status(401).json({success:false,message:"Only admin access this!"})
    }

    const passOk=bcrypt.compareSync(password,validUser.password)

    if(!passOk){
        return res.status(401).json({success:false,message:"Only admin access this!"})
    }

    const token=jwt.sign({id:validUser._id},JWT_ACCESS_KEY)

    const{password:pass,confirmPassword:cPass,...rest}=validUser._doc;


    res.cookie('accessToken',token).json({success:true,message:"Login successful.",rest})
        

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const adminSignOut=async(req,res)=>{
    try {
       
       const password=req.body.password;

       if(!password){
        return res.status(401).json({success:false,message:"Password required."})  
       }
       const id=req.adminId;
       const user=await AdminModel.findOne({_id:id})

       const passOk=bcrypt.compareSync(password,user.password)

      if(!passOk){
        return res.status(401).json({success:false,message:"Wrong credentials"})  
      }

        const student=await StudentModel.findOne({isLoggedIn:true})

        if(!student){
        return res.clearCookie('accessToken').json({success:true,message:"Logout successful.",})
        }

        student.isBanned=true;
        student.isLoggedIn=false;
        await student.save()       

        res.clearCookie('accessToken').json({success:true,message:"Logout successful.",})

    } catch (error) {
        console.log(error.message)
    }
}
module.exports={adminSignUp,adminSignIn,adminSignOut}