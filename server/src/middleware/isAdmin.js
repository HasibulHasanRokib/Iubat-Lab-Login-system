const jwt=require('jsonwebtoken');
const { JWT_ACCESS_KEY } = require('../config/config');

const isAdmin=(req,res,next)=>{
    try {
      const token=req.cookies.accessToken;
      
      if(!token){
        return res.status(400).json({success:false,message:"Invalid credentials."})
      }

      const admin=jwt.verify(token,JWT_ACCESS_KEY)
      
      req.adminId=admin.id;
      next()

    } catch (error) {
        console.log(error.message)
    }
}

module.exports=isAdmin;