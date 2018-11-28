const multer = require('multer');

const allowTypes = ['audio/mpeg', 'audio/mp4', 'audio/aac'];

const fileFilter = (req, { mimetype }, cb) => (
  cb(null, Boolean(allowTypes.indexOf(mimetype) > -1))
);

const storage = multer.memoryStorage();

module.exports = multer({ storage, fileFilter }).single('file');
