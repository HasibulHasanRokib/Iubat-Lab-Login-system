const jwt=require('jsonwebtoken');
const { JWT_ACCESS_KEY } = require('../config/config');

const isInstructor=(req,res,next)=>{
    try {
      const token=req.cookies.accessToken;
      
      if(!token){
        return res.status(400).json({success:false,message:"Invalid credentials."})
      }

      const instructor=jwt.verify(token,JWT_ACCESS_KEY)
      
      req.instructorId=instructor.id;
      next()
 
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=isInstructor;