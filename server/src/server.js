const app=require("./app");
const connectDB = require("./db");

const PORT= process.env.PORT||3000;

app.listen(PORT,async()=>{
    console.log(`server is running .`)
    await connectDB()
})
