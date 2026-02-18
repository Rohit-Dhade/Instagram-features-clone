require("dotenv").config()
const app = require('./src/app')
const ConnectTodb = require('./src/config/database')

ConnectTodb()
app.listen(3000 , (req , res)=>{
    console.log('SERVER is running on port 3000');
})