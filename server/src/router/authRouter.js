const express=require('express');
const { signUp,signIn,getLoginList } = require('../controller/authController');
const isLoggedIn = require('../middleware/isLoggedIn');

const authRouter=express.Router()

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.get('/active',isLoggedIn,getLoginList)

module.exports=authRouter;