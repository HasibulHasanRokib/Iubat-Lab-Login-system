const express=require('express');
const { signUp,signIn,activeUsers} = require('../controller/authController');


const authRouter=express.Router()

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.get('/active-users',activeUsers)

module.exports=authRouter;