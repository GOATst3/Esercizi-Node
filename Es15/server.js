const express = require('express');
const prisma = require('./client');
const cors = require('cors');
const {initMulterMiddleware} = require('./middleware/multer.js');
require('dotenv').config();

const app = express()
const upload = initMulterMiddleware()


app.use(express.json())
app.use(cors({origin:"*"}))
const port=process.env.PORT

//
//
//                  Routes
//                    || 
//                   \  /
//                    \/
//
//

//find all planets
app.get('/planets', async (req,res)=>{
    const planets = await prisma.Planet.findMany()
    res.json(planets)
})


//find planet by id  // the \\d+ is a regex that stands for "only digits [0-9], composed by one or more character"
app.get('/planet/:id(\\d+)', async (req,res,next)=>{
    const planetID = Number(req.params.id)

    const planet = await prisma.Planet.findUnique({
        where:{id:planetID}
    })
    if(!planet){
        res.status(404)
        return next('Cannot GET /planet/'+planetID)
    }
    res.json(planet)
})


//add a planet into db 
app.post('/planet', async (req, res) => {
    const data = req.body
    const planet = await prisma.planet.create({
        data : data
    });

    res.status(201).json(planet);
})

//update a planet
app.put('/planet/:id(\\d+)', async (req, res, next) => {
    const data = req.body
    const planetID = Number(req.params.id)

    try{
        const planet = await prisma.planet.update({
            where:{id : planetID},
            data : data
        });
        res.status(200).json(planet);
    }

    catch (e) {
        res.status(404)
        return next('Cannot Update /planet/'+planetID)
    }
})

//delete a planet
app.delete('/planet/:id(\\d+)', async (req, res, next) => {
    const planetID = Number(req.params.id)

    try{
        await prisma.planet.delete({
            where:{id : planetID},
        });
        res.status(204).end();
    }

    catch (e) {
        res.status(404)
        return next('Cannot delete /planet/'+planetID)
    }
})

//upload a photo
app.post('/planet/:id(\\d+)/photo',
    upload.single('photo'),
    async (req, res, next) => {

        if (!req.file) {
            res.status(400)
            return next('No photo file uploaded')
        }

        const planetId = Number(req.params.id)
        const photoFilename = req.file.filename

        try {
            await prisma.planet.update({
                where: { id : planetId },
                data: { photo : photoFilename }
            });
            res.status(201).json({ photoFilename })
        } catch (err) {
            res.status(404)
            next(`Cannot POST /planet/${planetId}/photo`)
        }

    });

app.use("/planet/photos", express.static("uploads"))
    
app.listen(port,()=>console.log('Server is running on localhost:'+port))

module.exports=app