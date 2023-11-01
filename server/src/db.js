const mongoose=require('mongoose')
const { MDB_URL } = require('./config/config')

const connectDB=async()=>{
try {
 await mongoose.connect(MDB_URL)   
 console.log("DB connected successful.")
} catch (error) {
    console.log('DB not connected!')
    console.log(error.message)  
} 
}

module.exports=connectDB