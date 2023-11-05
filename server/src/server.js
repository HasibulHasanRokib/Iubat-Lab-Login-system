const app=require("./app");
const connectDB = require("./db");

const PORT=3000;

app.listen(PORT,async()=>{
    console.log(`server is running at http://localhost:${PORT}`)
    await connectDB()
})
