const multer = require('multer');
 const { 
   PATH_UPLOAD_IMAGES,
} = require('./constants.shared');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH_UPLOAD_IMAGES);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },
});

module.exports = {
  storage,
};