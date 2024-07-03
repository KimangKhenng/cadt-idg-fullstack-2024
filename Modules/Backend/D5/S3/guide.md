# D5 S3: Dockerization

Watch video: https://youtu.be/rWw0ZHwsF5Q

Docker ensure `one code, run everywhere!`

Make sure you have at least 16GB RAM and the docker is installed!

## Create Dockerfile
Dockerfile holds instruction to build an image.
```js
//Dockerfile
FROM // Choose applicable node version
WORKDIR /app
ENV NODE_ENV development
COPY package.json yarn.lock ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
```

## Docker-compose
```yaml
services:
  express:
    build: .
    depends_on:
      - db
    restart: unless-stopped
  db:
    image: mongo:latest
    ports:
      - 27017:27017
```

## Running container
### Build image
```sh
docker-compose build
```
### Running container in background
```sh
docker-compose up -d
```
### Restarting container
```sh
docker-compose restart
```