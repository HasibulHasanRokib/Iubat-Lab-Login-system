const StudentModel=require('../model/studentModel')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


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

       if(studentExist.isBanned){
        return res.status(400).json({success:false,message:"You are blocked form this system."})

       }

       if(studentExist.isLoggedIn===true){

           const current = new Date();
           const time = current.toLocaleString();
           const previousLastLogouts = studentExist.lastLogout || [];
           previousLastLogouts.unshift({ timestamp: time });
           studentExist.lastLogout = previousLastLogouts;

           studentExist.isLoggedIn=false;
           await studentExist.save()

           return res.status(200).json({success:true,message:"Log out successful."})
       }

       studentExist.isLoggedIn=true;

       const current = new Date();
       const time = current.toLocaleString();
       const previousLastLogins = studentExist.lastLogin || [];
       previousLastLogins.unshift({ timestamp: time });
       studentExist.lastLogin = previousLastLogins;
       await studentExist.save();
        
       res.status(200).json({success:true,message:"Login successful."})
       
    } catch (error) {
        return res.status(500).json({success:false,message:"Login failed!"})
    }
}

const activeStudents=async(req,res)=>{

  try {
  const students=await StudentModel.find({isLoggedIn:true}).select({password:0})
  
  if(!students){
  return res.status(400).json({success:false,message:"No active student return",students})
  }
  res.status(200).json({success:true,message:"Active students return",students})

  } catch (error) {
    return res.status(500).json({success:false,message:error.message})
  }
}

const allStudents=async(req,res)=>{
    try {
     
    const search=req.query.search || '';
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 2;


    const searchRegExp=new RegExp('.*'+ search +'.*','i');

    const filter={
        $or:[
            {fullname:{$regex:searchRegExp}},
            {studentid:{$regex:searchRegExp}},
            {email:{$regex:searchRegExp}},
            {phone:{$regex:searchRegExp}},
        ]
    }


    const options={password:0} 
    const students= await StudentModel.find(filter,options).limit(limit).skip((page-1)*limit)

    const count=await StudentModel.find(filter).countDocuments()

     if(!students){
        return res.status(400).json({success:false,message:"No student return",students})
    }

    res.status(200).json({
        success:true,
        message:"All students return",
        students,
        pagination:{
            totalPage:Math.ceil(count/limit),
            currentPage:page,
            previousPage:page-1>0?page-1:null,
            nextPage:page +1 <= Math.ceil(count/limit)?page+1:null

        }
    })

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const bannedStudents=async(req,res)=>{
    try {

        const students=await StudentModel.find({isBanned:true}).select({password:0})
        
        if(!students){
            return res.status(401).json({success:false,message:"No banned student."})
        }
    
        res.status(200).json({success:true,message:"Banned students return",students})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const studentInfo=async(req,res)=>{
    try {
     const id=req.params.id;
     const student=await StudentModel.findByIdAndUpdate({_id:id},{
        $set:{
            isBanned:req.body.isBanned,
            fullname:req.body.fullname,
            email:req.body.email
        }
     },{new:true}).select({password:0})
       
     if(!student){
        return res.status(401).json({success:false,message:"Student not found."})
     }

     res.status(202).json({success:true,message:"Upate successful.",student})
     

    } catch (error) {
        console.log(error.message)
    }
}
const studentDelete=async(req,res)=>{
    try {
    const id=req.params.id;
    const student=await StudentModel.findByIdAndDelete({_id:id}).select({password:0})  
    res.status(200).json({success:true,message:"Delete successful.",student})

    } catch (error) {
        return res.status(500).json({success:false,message:"Delate failed."})
    }
}


module.exports={signUp,signIn,activeStudents,allStudents,bannedStudents,studentInfo,studentDelete}