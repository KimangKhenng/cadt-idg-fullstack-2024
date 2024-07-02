# D5 S3: Caching with Redis

Implementing caching in an Express.js application using Redis can significantly enhance performance by reducing the load on your server and speeding up response times.

## 1: Create Redis cache server with Docker
Add the following services to `docker-compose`:
```yaml
services:
  redis:
    image: redis:5
    container_name: cadt-redis
    ports:
      - 6379:6379
  redis-commander:
    image: rediscommander/redis-commander:latest
    environment:
      - REDIS_HOSTS=local:cadt-redis:6379
    ports:
      - "8082:8081"
    depends_on:
      - redis
```
## 2: Install Redis Client for Node.js
```sh
npm install redis
```

## 3: Set Up Redis Client
In `index.js`, set up the Redis client.
```js
const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
  console.error('Redis error:', err)
})
```

## 4: Implement Caching Middleware
Create a new file `cache.js` inside a `middlewares` directory to configure and export the cache middleware.

```js
const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
  console.error('Redis error:', err)
})

const cacheMiddleware = (req, res, next) => {
  const { url } = req

  client.get(url, (err, data) => {
    if (err) throw err

    if (data !== null) {
      res.send(data)
    } else {
      next()
    }
  })
}
module.exports = cacheMiddleware
```

## 5: Use Caching Middleware in Routes
Use the caching middleware in your routes. When a response is not found in the cache, store it after fetching the data.
```js
app.get('/data', cacheMiddleware, (req, res) => {
  const responseData = {
    message: 'This is data from the server.',
    timestamp: new Date()
  }

  // Store the response in Redis with an expiry time (e.g., 60 seconds)
  client.setex(req.url, 60, JSON.stringify(responseData))

  res.json(responseData)
})
```