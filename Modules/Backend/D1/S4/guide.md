# D1 S4 : Using MongoDB with Express via Mongoose CRUD Operations

MongoDB is a popular NoSQL database that provides a flexible and scalable solution for storing and managing data. When using MongoDB with Express.js, Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, simplifies interaction with the database. In this tutorial, we'll cover how to set up MongoDB with Express.js using Mongoose.

## Introduction to NoSQL

NoSQL databases like MongoDB and DynamoDB are designed to store and manage unstructured or semi-structured data. Unlike traditional SQL databases, they don't require a fixed schema and provide horizontal scalability.

## NoSQL vs SQL Database

- **Performance**: NoSQL databases often offer better performance for read-heavy workloads and horizontal scaling due to their distributed architecture.
- **Use Cases**: NoSQL databases are suitable for scenarios requiring flexible data models, real-time analytics, and scalability, such as social networks, IoT applications, and content management systems.
- **Data Organization**: NoSQL databases organize data in collections (MongoDB) or tables (DynamoDB), where each document or item can have a different structure.
- **Deployment Cost**: NoSQL databases can be more cost-effective for scaling horizontally, as they often require less infrastructure overhead compared to vertically scaling SQL databases.

## Setting up MongoDB via Docker

1. Install Docker on your machine if you haven't already. [Docker Installation Guide](https://docs.docker.com/get-docker/)
2. Pull the MongoDB Docker image:

   ```bash
   docker pull mongo
   ```

3. Run MongoDB as a Docker container:

   ```bash
   docker run --name my-mongodb -d -p 27017:27017 mongo
   ```

## Connect to MongoDB in Express App

1. Install Mongoose in your Express.js project:

   ```bash
   npm install mongoose
   ```

2. In your Express app, connect to MongoDB using Mongoose:

   ```javascript
   const mongoose = require('mongoose');

   // MongoDB connection URI
   const mongoURI = 'mongodb://localhost:27017/mydatabase';

   // Connect to MongoDB
   mongoose.connect(mongoURI)
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.error('MongoDB connection error:', err));
   ```

3. Define Mongoose schemas and models to interact with MongoDB collections:

   ```javascript
   // Define a schema
   const userSchema = new mongoose.Schema({
     name: String,
     age: Number,
     email: String
   });

   // Create a model
   const User = mongoose.model('User', userSchema);

   // Example usage
   const newUser = new User({ name: 'John', age: 30, email: 'john@example.com' });
   newUser.save().then((user) => console.log('User created:', user)).catch(err => console.error('Error:', err));
   ```

## User Model

Create a `user.js` file inside the `models` folder to define the `User` model:

```javascript
// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  dateOfBirth: Date,
  password: String,
  followings: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  tweets: [{ type: mongoose.Types.ObjectId, ref: 'Tweet' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

## Tweet Model

Create a `tweet.js` file inside the `models` folder to define the `Tweet` model:

```javascript
// models/tweet.js

const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  text: String,
  byUser: { type: mongoose.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
```

## Connecting to MongoDB

In your main Express application file (`app.js` or `index.js`), connect to MongoDB using Mongoose:

```javascript
// app.js

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Tweet = require('./models/tweet');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/tw-db', {
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
```

## Defining Routes and Controllers

Create route and controller files for `User` and `Tweet` resources. For example:

### User Routes and Controller:

```javascript
// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
```

```javascript
// controllers/userController.js

const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Implement other controller methods for CRUD operations
```

### Tweet Routes and Controller:

```javascript
// routes/tweetRoutes.js

const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');

router.post('/tweets', tweetController.createTweet);
router.get('/tweets', tweetController.getAllTweets);
router.get('/tweets/:id', tweetController.getTweetById);
router.put('/tweets/:id', tweetController.updateTweet);
router.delete('/tweets/:id', tweetController.deleteTweet);

module.exports = router;
```

```javascript
// controllers/tweetController.js

const Tweet = require('../models/tweet');

exports.createTweet = async (req, res) => {
  try {
    const tweet = await Tweet.create(req.body);
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Implement other controller methods for CRUD operations
```