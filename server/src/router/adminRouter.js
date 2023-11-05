const express=require("express");
const { adminSignUp,adminSignIn,adminSignOut } = require("../controller/adminController");
const isAdmin = require('../middleware/isAdmin');

const adminRouter=express.Router()

adminRouter.post("/sign-up",adminSignUp)
adminRouter.post("/sign-in",adminSignIn)
adminRouter.post("/sign-out",isAdmin,adminSignOut)

module.exports=adminRouter;