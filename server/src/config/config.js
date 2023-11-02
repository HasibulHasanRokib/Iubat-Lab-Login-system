require('dotenv').config()

const MDB_URL=process.env.DB_URL;
const JWT_ACCESS_KEY=process.env.JWT_KEY


module.exports={MDB_URL,JWT_ACCESS_KEY}