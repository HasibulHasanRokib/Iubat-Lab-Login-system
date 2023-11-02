const StudentModel=require('../model/studentModel')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt =require('jsonwebtoken');
const { JWT_ACCESS_KEY } = require('../config/config');

const signUp=async(req,res)=>{
try {

    const{studentid,program,fullname,gender,email,phone,password}=req.body;
    
    const student=await StudentModel.findOne({studentid})
     
    if(student){
    return res.status(400).json({success:false,message:"This student id already registered."})
    }

    const newRegister= await StudentModel({studentid,program,fullname,gender,email,phone,password:bcrypt.hashSync(password, salt)})

    await newRegister.save()
   
    res.status(201).json({success:true,message:"Registration successful.",newRegister})

} catch (error) {
    return res.status(400).json({success:false,message:"Registration failed!"})
}
}

const signIn=async(req,res)=>{
    try {

       const {studentid,password}=req.body;

       if(!studentid|| !password){
        return res.status(400).json({success:false,message:"Fill all the field!"})
       }

       const studentExist=await StudentModel.findOne({studentid})

       if(!studentExist){
        return res.status(400).json({success:false,message:"This student id are not registered."})
       }

       const passOk=bcrypt.compareSync(password,studentExist.password)

       if(!passOk){
        return res.status(400).json({success:false,message:"Password wrong."})
       }
       
       const token=jwt.sign({id:studentExist._id},JWT_ACCESS_KEY)

      res.cookie("accessToken",token).json({success:true,message:"Login successful."})

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success:false,message:"Login failed!"})
    }
}

const getLoginList=async(req,res)=>{
try {

const id=req.userId;

if(!id){
return res.status(400).json({success:false,message:"Credentials Error."})
}

const options={password:0,email:0,phone:0}

const student=await StudentModel.findById({_id:id},options)

res.status(200).json({success:true,message:"Return student.",student})

} catch (error) {
 console.log(error.message)   
}
}

module.exports={signUp,signIn,getLoginList}