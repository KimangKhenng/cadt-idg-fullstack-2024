# D5 S4: Deleting from AWS

Watch video: https://youtu.be/8ZZSWfiZcXs

## Delete file via DeleteCommand
```js
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const deleteFileOnS3 = asyncHandler(async (req, res) => {
    const id = req.params.id
    const file = await FileS3.findById(id)
    // Input parameters
    const input = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: file.key,
    };
    const command = new DeleteObjectCommand(input)
    const response = await s3Clinet.send(command)
    const result = await FileS3.deleteOne({ _id: id })
    return res.json({ response, result })
})
```