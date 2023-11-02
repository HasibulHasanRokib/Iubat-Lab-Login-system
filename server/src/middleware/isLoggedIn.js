const { JWT_ACCESS_KEY } = require("../config/config");
const jwt=require('jsonwebtoken')

const isLoggedIn=(req,res,next)=>{
try {
  const token=req.cookies.accessToken;

  if(!token){
  return res.status(400).json({success:false,message:'Token not found!'})  
  }

  const studentDoc=jwt.verify(token,JWT_ACCESS_KEY)

  if(!studentDoc){
  return res.status(400).json({success:false,message:'Token not verify!'})  
  }


  req.userId=studentDoc.id
  next()

} catch (error) {
    return res.status(400).json({success:false,message:error.message})  
}
}

module.exports=isLoggedIn;