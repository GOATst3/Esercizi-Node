const express = require('express');
const prisma = require('./client');
require('dotenv').config();

const app = express()
const port=process.env.PORT

app.get('/',(req,res)=>{
    res.json({res:'this is a response'})
})
app.get('/planets', async (req,res)=>{
    const planets = await prisma.Planet.findMany()
    res.json(planets)
})
app.listen(port,()=>console.log('Server is running on localhost:'+port))

module.exports=app