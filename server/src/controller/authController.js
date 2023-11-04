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

       studentExist.isLoggedIn=true;

       const current = new Date();
       const time = current.toLocaleTimeString("en-US");
       const previousLastLogins = studentExist.lastLogin || [];
       previousLastLogins.unshift({ timestamp: time });
       studentExist.lastLogin = previousLastLogins;
       await studentExist.save();
           
       const token = jwt.sign({ _id: studentExist._id }, JWT_ACCESS_KEY);
        
        res.cookie('accessToken',token).json({success:true,message:"Login successful."})
       
    } catch (error) {
        return res.status(500).json({success:false,message:"Login failed!"}),
        console.log(error.message)
    }
}

const currentUsers=async(req,res)=>{

  try {
  const activeUser=await StudentModel.find({isLoggedIn:true})
  res.status(200).json({activeUser})

  } catch (error) {
    console.log(error.message)
  }
}

const signOut=async(req,res)=>{
    try {

        const student=await StudentModel.findOne({_id:req.userId})

        if(!student){
            return res.status(401).json({success:false,message:"Logout failed."})
        }
        student.isLoggedIn=false;
        await student.save()
        res.clearCookie('accessToken').json({success:true,message:"Log out successful."})

    } catch (error) {
        console.log(error.message)
    }
}


module.exports={signUp,signIn,currentUsers,signOut}