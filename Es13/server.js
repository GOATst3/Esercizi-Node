const express = require('express');
require('dotenv').config();
require('express-async-errors');

const app = express()
const port=process.env.PORT

app.get('/',(req,res)=>{
    res.json({res:'this is a response'})

})
app.listen(port,()=>console.log('Server is running on localhost:'+port))

module.exports=app