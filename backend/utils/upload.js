const multer = require('multer');
const path = require('path')
const fs = require('fs')

const fileFilter = (req, file, cb) => {
  
    return cb(null, true);
 
};

const imageFilter = (req, file, cb) => {
    const allowedExtension = [".jpeg", ".jpg", ".png",".webp"];
    const ext = path.extname(file.originalname);

    if (allowedExtension.includes(ext)) {
        return cb(null, true);
    } else {
        return cb(new Error(`Extenion ${ext} not allowed`), true);
    }
};

const fileLimit =
{
    fileSize: 5 * 1024 * 1024,
    files: 10,
    fields: 20,
    fieldNameSize: 100,
    fieldSize: 1024 * 1024,
};

const imageFileLimit =
{
    fileSize: 2 * 1024 * 1024,
    files: 10,
    fields: 20,
    fieldNameSize: 100,
    fieldSize: 1024 * 1024,
};


const upload = (subfolder = "/", fileFilter, limits = fileLimit) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      uploadFolder = path.join("public/uploads", subfolder);
      fs.mkdirSync(uploadFolder, { recursive: true });

      return cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      return cb(null, `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`);
    },
  });
  return multer({
    storage,
    fileFilter,
    limits,
  });
};

module.exports = { upload, imageFilter,fileLimit, imageFileLimit };