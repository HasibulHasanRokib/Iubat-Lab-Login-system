const express=require('express');
const { signUp,signIn,currentUsers,signOut } = require('../controller/authController');
const isLoggedIn = require('../middleware/isLoggedIn');

const authRouter=express.Router()

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.get('/sign-out',isLoggedIn,signOut)
authRouter.get('/current-users',currentUsers)

module.exports=authRouter;