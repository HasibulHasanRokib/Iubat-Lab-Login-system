const express=require('express');
const { signUp,signIn,activeUsers} = require('../controller/authController');
const { registerValidation } = require('../validator/validation');
const runValidation = require('../validator');


const authRouter=express.Router()

authRouter.post('/sign-up',registerValidation,runValidation,signUp)
authRouter.post('/sign-in',signIn)
authRouter.get('/active-users',activeUsers)

module.exports=authRouter;