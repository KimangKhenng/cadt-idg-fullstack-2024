# D8 S1: Secure API with Rate Limit

Watch video: https://youtu.be/ao9qCGEw-0E

Rate limiting is a technique used to control the rate of incoming requests to a server. It is primarily used to:
- Prevent abuse or overuse of server resources.
- Protect against denial-of-service (DoS) attacks.
- Ensure fair usage by all users.
- Improve server stability and performance.

Rate limiting works by setting a threshold for the number of requests a client (usually identified by their IP address) can make to the server within a specified time window. Once the limit is reached, further requests from the client are either delayed, rejected, or responded to with an error message until the time window resets.

## Applying 'express-rate-limit' to Secure an Express Application:

`express-rate-limit` is a middleware for Express.js that helps in implementing rate limiting in an Express application.

```sh
npm install express-rate-limit
```

## Configure Rate Limiter

```js
const express = require('express')
const rateLimit = require('express-rate-limit')

const app = express()

// Define the rate limit rule
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Apply the rate limit rule to all requests
app.use(limiter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
```

## Customizing the rate limiter:

You can customize the rate limiter to suit your needs. Here are some common options:

- `windowMs`: Time frame for which requests are checked/remembered.
- `max`: Maximum number of requests allowed per windowMs.
- `message`: Message sent back to the client when the limit is reached.
- `headers`: Whether to include rate limit headers in the response (default is true).
- `keyGenerator`: Function to generate the key for each client based on the request (default is the IP address).

For example:
```js
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again after 10 minutes.',
  headers: true,
  keyGenerator: (req) => req.ip, // Use the request IP address as the key
})

// Apply the rate limit rule to specific routes
app.use('/api/...', limiter)
```

## Using redis for distrubted environment

To implement rate limiting with Redis as the datastore, you can use the `rate-limit-redis` package along with `express-rate-limit` in your Express application. 

```sh
npm install rate-limit-redis
```

Configure `rateLimiter` to use Redis store

```js
const redisClient = redis.createClient({
  // Redis server configuration options (e.g., host, port)
  // Example:
  // host: 'localhost',
  // port: 6379,
})

const limiter = new RateLimit({
  store: new RedisStore({
    client: redisClient,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
```

## Test Scaling Instances

Testing scaling your instance by modifying `docker-compose.yml`:

```yaml
services:
  express-cadt:
  .
  .
  scale: 3
```