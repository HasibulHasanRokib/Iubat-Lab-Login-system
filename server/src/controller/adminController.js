const AdminModel = require("../model/adminModel");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt=require('jsonwebtoken');
const { JWT_ADMIN_KEY } = require("../config/config");

const singUp=async(req,res)=>{
try {
  const {name,email,password}=req.body;
  
  if(!name || !email ||!password){
    return res.status(401).json({success:false,message:"Fill all the field!"})
  }
  const adminExist=await AdminModel.findOne({email:email})

  if(adminExist){
   return res.status(401).json({success:false,message:"You are already register!"})

  }
  
  const admin=await AdminModel({name,email,password:bcrypt.hashSync(password,salt)})

  await admin.save()

  res.status(201).json({success:true,message:"Admin registration successful."})
  
  
} catch (error) {
    return res.status(500).json({success:false,message:"Admin registration failed!"})
}
}

const signIn=async(req,res)=>{
    try {
    const {email,password}=req.body
 
    const validAdmin=await AdminModel.findOne({email:email})

    if(!validAdmin){
        return res.status(401).json({success:false,message:"Only admin can access this!"})
    }

    const passOk=bcrypt.compareSync(password,validAdmin.password)

    if(!passOk){
        return res.status(401).json({success:false,message:"Only admin can access this!"})
    }

    const token=jwt.sign({id:validAdmin._id},JWT_ADMIN_KEY)

    const{password:pass,...rest}=validAdmin._doc;


    res.cookie('access_Token',token,{httpOnly:false}).json({success:true,message:"Login successful.",rest})
        

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const signOut=async(req,res)=>{
    try {
        res.clearCookie('access_Token').json({success:true,message:"Logout successful.",}) 
    } catch (error) {
    return res.status(500).json({success:false,message:"Logout failed!"})    
    }
}

module.exports={singUp,signIn,signOut}