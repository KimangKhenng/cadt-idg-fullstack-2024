# D6 S2: Serving file from Local

Watch video: https://youtu.be/AHDztx5qhRU

Define a function to serve file over http request
```js
app.get('/files/:id', async (req, res) => {
    const id = req.params.id
    const file = await File.findById(id)
    console.log(file.path)
    return res.sendFile(file.path)
})
```