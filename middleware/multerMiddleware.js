const multer = require('multer');

// Set up Multer for handling file uploads
// CURRENT FUNCTIONALITY WILL BE TO LOCAL STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); // File naming
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
