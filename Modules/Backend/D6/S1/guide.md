# D6 S1: File Upload 

Watch Video: https://youtu.be/MD6ad7K4yZ4

Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of `busboy` for maximum efficiency.

## 1: Install Multer
```bash
npm install multer
```

## 2: Set Up Multer in Project

Create a new file `upload.js` inside a `middlewares` directory to configure and export the multer middleware.

```js
// middlewares/upload.js
const multer = require('multer')
const path = require('path')

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('file')

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

module.exports = upload
```

## 3: Create Upload Directory
Ensure that you have an `uploads` directory at the root of your project to store the uploaded files:
```bash
mkdir upload
```

## 4: Create a Route for File Upload

```js
// routes/upload.js
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ msg: err })
    } else {
      if (req.file == undefined) {
        res.status(400).json({ msg: 'No file selected!' })
      } else {
        res.status(200).json({
          msg: 'File uploaded!',
          file: `uploads/${req.file.filename}`,
        })
      }
    }
  })
})

module.exports = router
```

## 5: Integrate the Route in index.js
```js
// index.js
const express = require('express')
const uploadRouter = require('./routes/upload.js')
...
app.use('/upload', uploadRouter) // Add this line
...
const server = https.createServer({ key, cert }, app)
server.listen(4000, () => {
    console.log('Listening on port 4000!')
})
```

## 6: Test the File Upload

You can now test the file upload functionality using a tool like Postman. Make a POST request to `https://localhost:4000/upload` with a form-data body containing a `file` field named file.

