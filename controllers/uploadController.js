const cloudinary = require('cloudinary');
const Datauri = require('datauri');

const photoUploadService = require('../services/upload/photoUploadService');

exports.cloudinaryPhotoUpload = (req, res) => (
  photoUploadService(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    if (!req.file) {
      return res.status(400).send();
    }

    const dataUri = new Datauri();
    dataUri.format('.png', req.file.buffer);

    return cloudinary.uploader
      .upload(dataUri.content, response => (
        res.send({
          url: response.url,
          secureUrl: response.secure_url
        })
      ));
  })
);
