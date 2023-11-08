const express=require('express');
const { signUp,signIn,activeStudents, allStudents, bannedStudents, studentInfo,studentDelete} = require('../controller/studentController');
const { registerValidation } = require('../validator/validation');
const runValidation = require('../validator');


const studentRouter=express.Router()

studentRouter.post('/sign-up',registerValidation,runValidation,signUp)
studentRouter.post('/sign-in',signIn)
studentRouter.get('/active',activeStudents)
studentRouter.get('/students',allStudents)
studentRouter.get('/banned',bannedStudents)
studentRouter.post('/info/:id',studentInfo)
studentRouter.delete('/delete/:id',studentDelete)

module.exports=studentRouter;