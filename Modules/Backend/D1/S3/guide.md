# D1 S3 : Express request's query and params

Watch recorded class:https://youtu.be/eYHPtnCtRhs

## Request Params

Request params are parts of the URL path that are used to capture dynamic values. Express.js allows us to define routes with parameters using a colon (`:`) followed by the parameter name.

```javascript
const express = require('express');
const app = express();

// Route handler to handle GET requests with parameters
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, when a GET request is made to `/api/users/123`, Express.js will capture the value `123` as the `id` parameter and store it in `req.params.id`. We can then access this parameter within our route handler.

## Combining Query and Params

You can also use both query parameters and route parameters in the same route handler.

```javascript
const express = require('express');
const app = express();

// Route handler to handle GET requests with both query parameters and params
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, age } = req.query;
  res.send(`User ID: ${userId}, Name: ${name}, Age: ${age}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, a GET request to `/api/users/123?name=John&age=30` will capture `123` as the `id` parameter and `name=John` and `age=30` as query parameters.

## Error Handling in Express.js

Error handling is an essential aspect of building robust and reliable Express.js applications. Handling errors gracefully ensures that your application remains stable and provides meaningful feedback to users. In this tutorial, we'll cover error handling in Express.js and how to use `express-async-handler` to simplify asynchronous error handling.

## Basic Error Handling

Express.js provides middleware functions to handle errors in different parts of the request-response cycle. The basic error-handling middleware function takes four arguments: `(err, req, res, next)`. You can define this middleware at the end of the middleware stack to catch any errors that occur during request processing.

```javascript
// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
```

## Handling Errors in Route Handlers

In route handlers, you can use `try-catch` blocks to catch synchronous errors and pass them to the next middleware function or the basic error handling middleware.

```javascript
app.get('/example', (req, res, next) => {
  try {
    // Code that may throw an error
    throw new Error('Something went wrong!');
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});
```

## Using express-async-handler

`express-async-handler` is a utility function that wraps asynchronous route handlers and automatically catches any errors thrown during their execution. This eliminates the need for `try-catch` blocks in asynchronous route handlers.

### Installation:

```bash
npm install express-async-handler
```

### Usage:

```javascript
const asyncHandler = require('express-async-handler');

// Asynchronous route handler wrapped with express-async-handler
app.get('/async-example', asyncHandler(async (req, res, next) => {
  // Asynchronous code that may throw an error
  throw new Error('Something went wrong asynchronously!');
}));
```

With `express-async-handler`, you can simplify your route handlers and improve the readability of your code by removing unnecessary error-handling boilerplate.