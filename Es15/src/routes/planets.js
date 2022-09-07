const express = require('express');
const prisma = require('../lib/prisma/client');
const {validate} = require('../lib/middleware/validation/index');
const { checkAuthorization } = require('../lib/middleware/passport');
const planetSchema = require('../lib/middleware/validation/planet');
const { initMulterMiddleware } = require('../lib/middleware/multer');

const app = express.Router()
const upload = initMulterMiddleware()



//
//
//                  Routes
//                    || 
//                   \  /
//                    \/
//
//

//find all planets
app.get('/', async (req, res) => {
    const planets = await prisma.planet.findMany()

    res.json(planets)
})

//find planet by id  // the \\d+ is a regex that stands for "only digits [0-9], composed by one or more character"
app.get('/:id(\\d+)', async (req,res,next)=>{
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
app.post(
    '/',
    checkAuthorization,
    validate({ body: planetSchema }),
    async (req, res) => {

    const data = req.body
    const username = req.user?.username;
    const planet = await prisma.planet.create({
        data: {...data,createdBy: username, updatedBy: username}
    });

    res.status(201).json(planet);
})

//update a planet
app.put(
    '/:id(\\d+)',
    checkAuthorization,
    validate({ body: planetSchema }),
    async (req, res, next) => {
        const data = req.body
        const planetID = Number(req.params.id)
        const username = req.user?.username

        try {
            const planet = await prisma.planet.update({
                where: { id: planetID },
                data: {...data, updatedBy:username}
            });
            res.status(200).json(planet);
        }
        
        catch (err) {
            res.status(404)
            return next(`Cannot PUT /planets/${planetId}`)
        }
    }
)

//delete a planet
app.delete(
    '/:id(\\d+)',
    checkAuthorization,
    async (req, res, next) => {
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
app.post(
    '/:id(\\d+)/photo',
    checkAuthorization,
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

app.use("/planets/photos", express.static("upload"))

module.exports = app