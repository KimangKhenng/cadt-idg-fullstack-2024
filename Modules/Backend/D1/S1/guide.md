# D1 S1 : Introduction to Express.js

Watch recorded class: https://youtu.be/JqE0kQcol-8

## What is Express.js?

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is designed for building web applications and APIs quickly and easily. Express.js simplifies the process of writing server-side logic in JavaScript by providing a lightweight framework that handles routing, middleware, and HTTP request/response handling.

## Why use Express.js for web development?

Express.js offers several advantages for web development:

1. **Fast and Minimalistic**: Express.js is lightweight and unopinionated, allowing developers to create applications quickly without unnecessary overhead.
2. **Flexible Routing**: It provides a simple yet powerful routing mechanism that allows developers to define routes for handling different HTTP requests.
3. **Middleware Support**: Express.js has a robust middleware ecosystem that enables developers to add various functionalities such as logging, authentication, and error handling to their applications.
4. **Integration with Node.js**: As Express.js is built on top of Node.js, it seamlessly integrates with existing Node.js modules and libraries.
5. **Scalability**: Express.js is highly scalable and can be used to build both small-scale and large-scale applications.

## Creating a basic Express.js project

To bootstrap a simple Express.js project, follow these steps:

1. Create a new directory for your project.
2. Initialize a new Node.js project using `npm init` command.
3. Install Express.js using `npm install express` command.
4. Create necessary directories such as `src` for source code, `public` for static files, etc.
5. Create a main file (e.g., `index.js`) inside the `src` directory to define your Express.js application.

## Creating a simple Express.js server

Here's an example of how to create a simple Express.js server:

```javascript
// index.js

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Handling HTTP requests and responses

In Express.js, you can handle HTTP requests and responses using route handlers. Route handlers are functions that are executed when a specific route is matched. You can define route handlers for different HTTP methods such as GET, POST, PUT, DELETE, etc.

```javascript
// Handling GET request
app.get('/api/users', (req, res) => {
  res.json({ users: [...] }); // Send JSON response
});

// Handling POST request
app.post('/api/users', (req, res) => {
  // Process request body
  res.send('User created successfully');
});
```

## Middleware in Express.js

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can modify the request and response objects, terminate the request-response cycle, or call the next middleware function in the stack.

```javascript
// Example middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Call the next middleware function
};

// Using middleware in Express.js
app.use(logger);
```

Middleware can be used for various purposes such as logging, authentication, error handling, etc.

## Testing the Application

With everything set up, you can now start the server and test your application.

```bash
node app.js
```

Open your browser or use a tool like Postman to send a GET request to `http://localhost:3000/api/users`. You should receive a JSON response with user data.

## Using nodemon for hot-reloading

Nodemon is a utility that monitors for changes in your Node.js application and automatically restarts the server when changes are detected. This is extremely helpful during development as it saves you from manually stopping and restarting the server every time you make a change to your code. In this tutorial, we'll explore how to use Nodemon with an Express.js application and set it up to achieve hot-reloading.

### Installing Nodemon

First, make sure you have Nodemon installed globally or locally in your project. If you haven't installed it globally, you can install it locally in your project:

```bash
npm install --save-dev nodemon
```

Next, let's set up a script in the `package.json` file to run our Express.js application using Nodemon.

```json
{
  "name": "your-express-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

In this setup, we've added a `dev` script that uses Nodemon to run our `app.js` file. This script will be used during development for hot-reloading.

## Running the Application

To start your Express application with Nodemon, simply run the following command in your terminal:

```bash
npm run dev
```

Nodemon will monitor your files for changes, and whenever you save changes to your code, it will automatically restart the server, providing you with hot-reloading functionality during development.

