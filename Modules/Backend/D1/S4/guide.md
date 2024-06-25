# D1 S4 : Practicing Seperation of Concern

Watch recorded class:https://youtu.be/tnzp98ztVOY

## What is Separation of Concerns?
Separation of concerns is a design principle that encourages dividing a software system into distinct sections, each addressing a separate concern. In Express.js applications, this often involves separating routes, controllers, and the main application logic into different files to keep the codebase organized and maintainable. In this tutorial, we'll explore how to implement separation of concerns in an Express.js application using JavaScript.

## Creating the Controller

In Express.js, controllers handle the application logic for specific routes. Let's create a `userController.js` file inside the `controllers` directory.

```javascript
// controllers/userController.js

exports.getUser = (req, res) => {
  // Logic to retrieve a user
  const user = { name: 'John', age: 30 };
  res.json(user);
};
```

## Creating the Router

Routers in Express.js define the application routes and link them to the appropriate controller methods. Let's create a `userRoutes.js` file inside the `routes` directory.

```javascript
// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUser);

module.exports = router;
```

## Setting up the Main Application

Now, let's set up the main Express.js application in the `app.js` file.

```javascript
// app.js

const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Mounting the userRoutes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
