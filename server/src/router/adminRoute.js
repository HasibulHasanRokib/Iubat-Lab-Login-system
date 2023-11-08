const express=require('express')
const { singUp, signIn, signOut } = require('../controller/adminController')

const adminRouter=express.Router()

adminRouter.post("/sign-up",singUp)
adminRouter.post("/sign-in",signIn)
adminRouter.get("/sign-out",signOut)

module.exports=adminRouter