### D4 S2 Service Discovery with Consul, Node.js (using Axios), and Nginx Automated in Docker Compose

Watch recorded video: https://youtu.be/Cna9I2ZvQvA
#### Prerequisites

- Basic knowledge of Docker and Docker Compose.
- Node.js and Nginx basics.
- Docker and Docker Compose installed on your machine.

### 1. **Setting Up Consul**

Create a directory named `consul-nginx-node`:

```bash
mkdir consul-nginx-node
cd consul-nginx-node
```

Inside this directory, create a `docker-compose.yml` file:

```yaml
version: '3'

services:
  consul:
    image: consul:latest
    container_name: consul
    ports:
      - "8500:8500"
      - "8600:8600/udp"
    command: "agent -dev -client=0.0.0.0"
    networks:
      - consul-network

networks:
  consul-network:
    driver: bridge
```

### 2. **Node.js Service**

Let's create a simple Node.js service that will register itself with Consul using Axios.

1. **Create a Node.js Server**

In the `consul-nginx-node` directory, create a folder called `node-app` and navigate into it:

```bash
mkdir node-app
cd node-app
```

Create a `server.js` file with the following content:

```javascript
const express = require('express');
const axios = require('axios');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const CONSUL_HOST = process.env.CONSUL_HOST || 'consul';
const SERVICE_NAME = 'node-service';

app.get('/', (req, res) => {
  res.send(`Hello from ${SERVICE_NAME} running on ${os.hostname()}`);
});

app.listen(PORT, async () => {
  console.log(`${SERVICE_NAME} is running on port ${PORT}`);

  // Register service with Consul using Axios
  try {
    const response = await axios.put(`http://${CONSUL_HOST}:8500/v1/agent/service/register`, {
      Name: SERVICE_NAME,
      ID: SERVICE_NAME,
      Address: os.hostname(),
      Port: PORT,
      Check: {
        HTTP: `http://${os.hostname()}:${PORT}/`,
        Interval: '10s'
      }
    });
    console.log('Service registered with Consul:', response.data);
  } catch (error) {
    console.error('Error registering service:', error.message);
  }
});
```

2. **Dockerize the Node.js Application**

In the `node-app` directory, create a `Dockerfile`:

```dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "server.js"]
```

Also, create a `package.json` file:

```json
{
  "name": "node-service",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "express": "^4.17.1"
  }
}
```

### 3. **Nginx as a Reverse Proxy**

Nginx will serve as a reverse proxy to distribute traffic between multiple instances of the Node.js service registered with Consul.

1. **Nginx Configuration**

Back in the `consul-nginx-node` directory, create a `nginx` folder and an `nginx.conf` file inside it:

```bash
mkdir nginx
cd nginx
```

```nginx
events {
    worker_connections 1024;
}

http {
    upstream node-service {
        server node-service:3000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://node-service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

2. **Dockerize Nginx**

Create a `Dockerfile` inside the `nginx` directory:

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
```

### 4. **Docker Compose Configuration**

Finally, we need to link everything together using Docker Compose.

Update the `docker-compose.yml` file:

```yaml
version: '3'

services:
  consul:
    image: consul:latest
    container_name: consul
    ports:
      - "8500:8500"
      - "8600:8600/udp"
    command: "agent -dev -client=0.0.0.0"
    networks:
      - consul-network

  node-service:
    build: ./node-app
    container_name: node-service
    ports:
      - "3000"
    environment:
      - CONSUL_HOST=consul
      - PORT=3000
    networks:
      - consul-network
    depends_on:
      - consul

  nginx:
    build: ./nginx
    container_name: nginx
    ports:
      - "80:80"
    networks:
      - consul-network
    depends_on:
      - node-service

networks:
  consul-network:
    driver: bridge
```

### 5. **Running the Setup**

Now, let's bring everything up:

```bash
docker-compose up --build
```

- The Consul server will start and be accessible at `http://localhost:8500`.
- The Node.js service will start and register itself with Consul using Axios.
- Nginx will proxy requests to the Node.js service.

### 6. **Testing the Setup**

Open your browser and go to `http://localhost`. You should see the message "Hello from node-service running on [container_id]". The Node.js service is now being proxied through Nginx, and it's discoverable by Consul.
