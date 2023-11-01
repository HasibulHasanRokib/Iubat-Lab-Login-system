const express=require('express');
const { signUp,signIn } = require('../controller/authController');

const authRouter=express.Router()

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)

module.exports=authRouter;