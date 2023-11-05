const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authRouter = require('./router/authRouter')
const adminRouter = require('./router/adminRouter')

const app=express()
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/student',authRouter)
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to the server.') 
})

module.exports=app;