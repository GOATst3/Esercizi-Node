const multer = require('multer');
const mime = require('mime');
const {randomUUID} = require('node:crypto');
const { callbackify } = require('node:util');

const generatePhotoFilename= (mimeType) =>{
    const randomFilename = `${randomUUID()}-${Date.now()}`
    const fileExtension = mime.getExtension(mimeType)
    const filename = `${randomFilename}.${fileExtension}`

    return filename
}

const storage = multer.diskStorage({
    destination : "uploads/",
    filename : (req,file,callback) =>{
        return callback (null, generatePhotoFilename(file.mimetype))
    }
})
const multerOptions = {}
const initMulterMiddleware = ()=> {
    return multer({storage, ...multerOptions})
}

module.exports = {multerOptions,initMulterMiddleware}