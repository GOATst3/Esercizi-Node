const express = require('express');
const { planet } = require('./client');
const prisma = require('./client');
require('dotenv').config();

const app = express()

app.use(express.json())

const port=process.env.PORT

app.get('/',(req,res)=>{
    res.json({res:'this is a response'})
})

app.get('/planets', async (req,res)=>{
    const planets = await prisma.Planet.findMany()
    res.json(planets)
})

app.post('/planets', async (req, res) => {
    const data = req.body
    const planet = await prisma.planet.create({
        data : data
    });

    res.status(201).json(planet);
})


app.listen(port,()=>console.log('Server is running on localhost:'+port))

module.exports=app