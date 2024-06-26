# D3 S4: Validation via express-validate

Watch recorded class: https://youtu.be/5PO42YjdZlY

## Introduction

[Express-Validator](https://express-validator.github.io/docs) is a middleware for Express.js that helps in validating incoming request data. It provides various validation and sanitization functions to ensure that the data sent to your server is valid and safe to use.

In this tutorial, we'll go through the steps of setting up and using Express-Validator for request validation in a Node.js application, including schema validation.

## Install Express and Express-Validator

Install Express and Express-Validator as dependencies in your project.

```bash
npm install express express-validator
```

## Step 3: Create an Express App

Create a new file named `app.js` (or any other preferred name) and set up a basic Express app.

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Define routes and validation rules here
// ...

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Step 4: Define Validation Rules

Inside your `app.js` file, define validation rules using Express-Validator's `body` method or by using schema validation.

### Using `body` Method for Individual Fields

```javascript
app.post(
  '/submit',
  [
    body('username').isLength({ min: 5 }).trim(),
    body('email').optional().isEmail()
    body('password').isStrongPassword(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with handling the valid data
    // ...
  }
);
```

Read more on [validation chain](https://express-validator.github.io/docs/guides/validation-chain)

### Using Schema Validation

You can also define validation schemas using Express-Validator's `checkSchema` method for more structured validation.

```javascript
const { checkSchema } = require('express-validator');

const userSchema = checkSchema({
  username: {
    isLength: {
      options: { min: 5 },
      errorMessage: 'Username must be at least 5 characters long',
    },
  },
  email: {
    isEmail: true,
    errorMessage: 'Invalid email address',
  },
  password: {
    isStrongPassword: true,
    errorMessage: 'Password must be strong',
  },
});

app.post(
  '/submit',
  userSchema,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with handling the valid data
    // ...
  }
);
```

## Step 5: Handle Validation Errors

Inside the route handler where validation rules are applied, use `validationResult` to check for validation errors. If there are validation errors, return a response with a status code of 400 and an array of error messages.

```javascript
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
```

## Step 6: Start the Server

Finally, start the Express server to listen for incoming requests.

```bash
node app.js
```

Your Express app with request validation using Express-Validator, including schema validation, is now ready to use!

