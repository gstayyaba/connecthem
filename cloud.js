const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "dskqknnla",
  api_key: "815317365562651",
  api_secret: "mvZ1TW70xrw4CGLSLmXGT0ckIXU"
});

var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      return file.fieldname.split('img')[1]
    },
    format: 'png',
    public_id: function(req, file) {
      return req.body.cnic
    }
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
