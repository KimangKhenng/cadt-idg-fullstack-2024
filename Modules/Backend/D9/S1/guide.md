# D9 S1: Real time communication via WebSocket

Watch video: https://youtu.be/cxrolBDuTyg

`socket.io` library enables us to establish real time communication between client and server.

## 1. Create project and install library
Create a new folder and open CMD(Windows) or Terminal(Unix) at that location
```sh
npm init
```
After finishing the initilization, install neccessary packages.
```sh
npm install express socket.io
```

## 2. Bootstrap Project
Let's setup a basic sever.
```js
const express = require('express')
const cors = require('cors')
const { join } = require('node:path')
const app = express()
const { createServer } = require('node:http')
const server = createServer(app)
app.use(cors())
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: '*'
    },
})
app.get('/', (req, res) => {
    res.send("Hello")
})
io.on('connect', function (socket) {
    socket.on('send-message', (msg) => {
        io.emit('re-message', msg)
    })
})
server.listen(4000, () => {
    console.log("Server listening to port 4000")
})
```
## 3. Using template to connect to server
Download `test-socket.zip` and extract to a folder and run the `index.html` using `Live Server` extension in `VS Code`