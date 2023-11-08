const express=require("express");
const { instructorSignUp,instructorSignIn,instructorSignOut } = require("../controller/instructorController");
const isInstructor = require('../middleware/isInstructor');

const instructorRouter=express.Router()

instructorRouter.post("/sign-up",instructorSignUp)
instructorRouter.post("/sign-in",instructorSignIn)
instructorRouter.post("/sign-out",isInstructor,instructorSignOut)

module.exports=instructorRouter;