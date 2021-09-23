const multer = require('multer');
const path = require('path');

const uploadImage = (req, res, next) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'public/uploads'),
        filename: (req, file, cb) => {
            uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E8)}${path.extname(file.originalname)}`,
                cb(null, uniqueName)
        }
    });

    const upload = multer({
        storage,
        limits: { fileSize: 1000000 * 5 }
    }).single('myImage');

    req.upload = upload;
    return next();
}

module.exports = uploadImage;