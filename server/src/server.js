const app=require("./app");
const connectDB = require("./db");

const PORT=process.env.PORT;

app.listen(PORT,async()=>{
    console.log(`server is running.`)
    await connectDB()
})
