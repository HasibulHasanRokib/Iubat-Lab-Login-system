const { body } = require('express-validator');

const registerValidation=[
 body("studentid")
 .trim()
 .notEmpty()
 .withMessage("Enter your student id!")
 .isLength({min:8,max:8})
 .withMessage("Student id must be 8 digits."),

 body("program")
 .trim()
 .notEmpty()
 .withMessage("Program required!"),

 body("fullname")
 .trim()
 .notEmpty()
 .withMessage("Enter your full name!")
 .isLength({min:4})  
 .withMessage("Enter your full name!"),

 body("gender")
 .trim()
 .notEmpty()
 .withMessage("Gender is required!"),

 body("email")
 .trim()
 .notEmpty()
 .withMessage("Enter your email!")
 .isEmail()
 .withMessage("Enter valid email!"),

 body("phone")
 .trim()
 .notEmpty()
 .withMessage("Enter your phone number!")
 .isLength({min:11,max:11})
 .withMessage("Phone number must be 11 digits!"),

 body("password")
 .trim()
 .notEmpty()
 .withMessage("Password required!")
 .isLength({min:4})
 .withMessage("Password minimum 4 characters!") 
]


module.exports={registerValidation}