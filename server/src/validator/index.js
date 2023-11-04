const {validationResult}=require('express-validator')

const runValidation=async(req,res,next)=>{
    try {
      const errors=validationResult(req)
      if(!errors.isEmpty()){
        return res.status(409).json({success:false,message:errors.array()[0].msg})
      }
      next()  
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports=runValidation;