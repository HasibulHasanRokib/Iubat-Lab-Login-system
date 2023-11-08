require('dotenv').config()

const MDB_URL=process.env.DB_URL;
const JWT_ACCESS_KEY=process.env.JWT_KEY
const JWT_ADMIN_KEY=process.env.JWT_KEY_ADMIN


module.exports={MDB_URL,JWT_ACCESS_KEY,JWT_ADMIN_KEY}