# D1 S2 : Express request's query and params

Watch recorded class:https://youtu.be/s1UQJLjqJ8I

## Running Express over HTTPS in localhost

To run this in HTTPS, we need to install a tool called `mkcert`. Follow the [installation instructions](https://github.com/FiloSottile/mkcert/blob/v1.4.1/README.md#installation) or if you’re using macOS and Homebrew, run this command:
```bash
$ brew install mkcert
```
Generate local key and certificate
```bash
$ mkcert -install
$ mkcert localhost
```
This will create a certificate file localhost.pem and key file localhost-key.pem in the current directory.
You can also specify the directory to genreate into.
```bash
$ mkcert -cert-file FILE -key-file FILE localhost
```

Now use `node https` package to serve https server:
```js
const fs = require("fs");
const https = require("https");

const express = require("express");

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

server = https.createServer({ key, cert }, app);

server.listen(3000);
```

## Request Query

Request queries are key-value pairs sent in the URL after the `?` symbol. Express.js provides a convenient way to access these query parameters.

```javascript
const express = require('express');
const app = express();

// Route handler to handle GET requests with query parameters
app.get('/api/users', (req, res) => {
  const { name, age } = req.query;
  res.send(`Name: ${name}, Age: ${age}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, when a GET request is made to `/api/users?name=John&age=30`, Express.js will parse the query parameters and store them in the `req.query` object. We can then access these parameters like regular JavaScript objects.


