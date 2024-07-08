# D7 S1: Caching with Redis

Watch video: https://youtu.be/8_KHhMJ0dXA

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
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`
})

client.on('error', (err) => {
    console.error('Redis error:', err)
}).on('connect', () => console.log('Conneted to Redis server!')).connect()
```

## 4: Implement Caching Middleware
Create a new file `cache.js` inside a `middlewares` directory to configure and export the cache middleware.

```js
const asyncHandler = require('express-async-handler')
const cacheMiddleware = asyncHandler(async (req, res, next) => {
    const { originalUrl } = req
    const data = await client.get(originalUrl)
    if (data !== null) {
        res.json(JSON.parse(data))
    } else {
        next()
    }
})
module.exports = { cacheMiddleware }
```

## 5: Use Caching Middleware in Routes
Use the caching middleware in your routes. When a response is not found in the cache, store it after fetching the data.
```js
app.get('/data', cacheMiddleware, (req, res) => {
  const responseData = {
    message: 'This is data from the server.',
    timestamp: new Date()
  }

      const data = await client.get(originalUrl)
    if (data == null) {
        await client.set(originalUrl, JSON.stringify(responseData))
    }

  res.json(responseData)
})
```