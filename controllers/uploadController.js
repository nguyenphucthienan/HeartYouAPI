const cloudinary = require('cloudinary');
const Datauri = require('datauri');

const photoUploadService = require('../services/upload/photoUploadService');
const audioUploadService = require('../services/upload/audioUploadService');

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

exports.cloudinaryAudioUpload = (req, res) => (
  audioUploadService(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    if (!req.file) {
      return res.status(400).send();
    }

    const dataUri = new Datauri();
    dataUri.format('.mp3', req.file.buffer);

    return cloudinary.v2.uploader
      .upload(dataUri.content,
        { resource_type: 'auto' },
        (error, result) => {
          if (result) {
            return res.send({
              url: result.url,
              secureUrl: result.secure_url
            });
          }

          return res.status(500).send();
        });
  })
);
