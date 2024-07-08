# D6 S3: File Upload to AWS S3

Watch video: https://youtu.be/ZjZvJ1YgfnU

We'll add file upload functionality to Amazon S3 using `multer` and `@aws-sdk/client-s3`. 

## 1: Create an AWS Account and S3 Bucket

1. **Create AWS Account**: If you don't have an AWS account, create one at [AWS](https://aws.amazon.com/).
2. **Create S3 Bucket**:
   - Go to the S3 service in the AWS Management Console.
   - Click "Create bucket".
   - Enter a unique bucket name and select a region.
   - Uncheck "Block all public access" to make your files publicly accessible (optional).
   - Click "Create bucket".

## 2: Configure Bucket Permissions

1. **Bucket Policy**: Set up a bucket policy to allow public access to your files (optional).

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```
## 3: Create IAM User and Access Keys
### Create IAM User:
   - Go to the IAM service in the AWS Management Console.
   - Click "Add user".
   - Enter a username and select "Local code".
   - Attach the policy AmazonS3FullAccess to the user.
   - Complete the creation process and download the access key and secret key.

## 4: Install Multer and AWS SDK v3
Install the necessary packages:
```sh
npm install multer-s3 @aws-sdk/client-s3
```
## 5 : Set Up Environment Variables
Add the following to `.env` file in the root of your project and add your AWS credentials and bucket name:
```
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_S3_BUCKET_NAME=your-bucket-name
```
## 6: Set Up Multer with AWS SDK v3
Create a new file `uploadS3.js` inside a `middlewares` directory to configure and export the multer middleware.
```js
// middlewares/uploadS3.js
const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

// Configure AWS SDK
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

// Set up Multer-S3
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    },
  }),
}).single('file')

module.exports = uploadS3
```
## 7: Create a Route for S3 File Upload
Create a new route file `uploadS3.js` inside the `routes` directory.
```js
// routes/uploadS3.js
const express = require('express')
const router = express.Router()
const uploadS3 = require('../middlewares/uploadS3')

router.post('/', (req, res) => {
  uploadS3(req, res, (err) => {
    if (err) {
      res.status(400).json({ msg: err })
    } else {
      if (req.file == undefined) {
        res.status(400).json({ msg: 'No file selected!' })
      } else {
        res.status(200).json({
          msg: 'File uploaded!',
          file: req.file.location,
        })
      }
    }
  })
})

module.exports = router
```
## 8: Integrate the Route in index.js
```js
// index.js
const express = require('express')
const uploadS3Router = require('./routes/uploadS3.js')
...
app.use('/uploadS3', uploadS3Router) // Add this line
...
const server = https.createServer({ key, cert }, app)
server.listen(4000, () => {
    console.log('Listening on port 4000!')
})
```