const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authRouter = require('./router/authRouter')

const app=express()
app.use(cors({credentials:true,origin:"https://iubat-lab-login-system.vercel.app"}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/student',authRouter)

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to the server.') 
})

module.exports=app;