const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentid: {
    type: Number,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },

  lastLogin:{
    type:Array,
  },

  lastLogout:{
    type:Array,
  },

  isLoggedIn:{
    type:Boolean
  },

  isBanned:{
    type:Boolean,
    default:false
  }
  

}, { timestamps: true });



const StudentModel = mongoose.model("students", studentSchema);

module.exports = StudentModel;