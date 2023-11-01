const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const authRouter = require('./router/authRouter')

const app=express()
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/student',authRouter)

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to the server.') 
})

module.exports=app;