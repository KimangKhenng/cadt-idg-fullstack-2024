# D4 S1: Role-based Authorization

## Validation Chain

Express-Validator allows you to create a validation chain for more complex validation scenarios where you can apply multiple validation rules to a single field. Below are some features and methods that can be used within a validation chain:

1. `isEmail`: Checks if the field value is a valid email address.
2. `isLength`: Checks if the field value's length is within a specified range.
3. `isAlphanumeric`: Checks if the field value contains only letters and numbers.
4. `isNumeric`: Checks if the field value is a numeric value.
5. `isDecimal`: Checks if the field value is a decimal number.
6. `isStrongPassword`: Checks if the field value is a strong password based on complexity criteria.
7. `isURL`: Checks if the field value is a valid URL.
8. `isBoolean`: Checks if the field value is a boolean (`true` or `false`).
9. `isIn`: Checks if the field value is included in a specified array of allowed values.
10. `matches`: Checks if the field value matches a specified regular expression pattern.

Here's an example of using a validation chain with some of these features:

```javascript
const { body } = require('express-validator');

const userValidationChain = [
  body('username')
    .trim()
    .isLength({ min: 5, max: 20 }).withMessage('Username must be between 5 and 20 characters')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers'),

  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .isStrongPassword().withMessage('Password must be strong')
    .matches(/^[A-Za-z0-9@#$%^&+=]{8,}$/).withMessage('Password must contain at least 8 characters'),

  body('age')
    .isNumeric().withMessage('Age must be a numeric value')
    .isInt({ min: 18, max: 100 }).withMessage('Age must be between 18 and 100'),

  body('website')
    .optional({ nullable: true })
    .isURL().withMessage('Invalid URL'),

  body('isSubscribed')
    .isBoolean().withMessage('Subscription status must be true or false'),

  body('role')
    .isIn(['admin', 'user', 'guest']).withMessage('Invalid role'),

  body('zipcode')
    .isLength({ min: 5, max: 10 }).withMessage('Zipcode must be between 5 and 10 characters'),

  body('amount')
    .isDecimal().withMessage('Amount must be a decimal number'),
];

app.post('/register', userValidationChain, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with user registration
  // ...
});
```

In this example, we define a `userValidationChain` array with various validation rules for fields such as `username`, `email`, `password`, `age`, `website`, `isSubscribed`, `role`, `zipcode`, and `amount`. Adjust these rules according to your application's requirements.

## Define Validation Schema

Express-Validator allows you to define validation schemas, which provide a structured way to validate multiple fields with various validation rules. A validation schema is useful for organizing and centralizing validation logic for complex data objects. Below are some features and methods that can be used within a validation schema:

1. `isEmail`: Checks if the field value is a valid email address.
2. `isLength`: Checks if the field value's length is within a specified range.
3. `isAlphanumeric`: Checks if the field value contains only letters and numbers.
4. `isNumeric`: Checks if the field value is a numeric value.
5. `isDecimal`: Checks if the field value is a decimal number.
6. `isStrongPassword`: Checks if the field value is a strong password based on complexity criteria.
7. `isURL`: Checks if the field value is a valid URL.
8. `isBoolean`: Checks if the field value is a boolean (`true` or `false`).
9. `isIn`: Checks if the field value is included in a specified array of allowed values.
10. `matches`: Checks if the field value matches a specified regular expression pattern.

Here's an example of defining a validation schema with some of these features:

```javascript
const { checkSchema } = require('express-validator');

const userSchema = checkSchema({
  username: {
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: 'Username must be between 5 and 20 characters',
    },
    isAlphanumeric: {
      errorMessage: 'Username must contain only letters and numbers',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Invalid email address',
    },
  },
  password: {
    isStrongPassword: {
      errorMessage: 'Password must be strong',
    },
    matches: {
      options: /^[A-Za-z0-9@#$%^&+=]{8,}$/,
      errorMessage: 'Password must contain at least 8 characters',
    },
  },
  age: {
    isNumeric: {
      errorMessage: 'Age must be a numeric value',
    },
    isInt: {
      options: { min: 18, max: 100 },
      errorMessage: 'Age must be between 18 and 100',
    },
  },
  website: {
    optional: true,
    isURL: {
      errorMessage: 'Invalid URL',
    },
  },
  isSubscribed: {
    isBoolean: {
      errorMessage: 'Subscription status must be true or false',
    },
  },
  role: {
    isIn: {
      options: [['admin', 'user', 'guest']],
      errorMessage: 'Invalid role',
    },
  },
  zipcode: {
    isLength: {
      options: { min: 5, max: 10 },
      errorMessage: 'Zipcode must be between 5 and 10 characters',
    },
  },
  amount: {
    isDecimal: {
      errorMessage: 'Amount must be a decimal number',
    },
  },
});

app.post('/register', userSchema, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with user registration
  // ...
});
```

In this example, we define a `userSchema` object with validation rules for fields such as `username`, `email`, `password`, `age`, `website`, `isSubscribed`, `role`, `zipcode`, and `amount`. The `checkSchema` method is used to apply the validation schema to a route handler for registration. Adjust these rules according to your application's requirements.

## Using Validation Schema with Custom Function

In addition to built-in validation methods, Express-Validator allows you to define custom validation functions to handle specific validation requirements. One common scenario is validating if the password and confirm password fields match. Let's walk through how to achieve this using a validation schema and a custom validation function.

### Step 1: Define Validation Schema

First, define a validation schema for your registration form with fields like `username`, `email`, `password`, and `confirmPassword`.

```javascript
const { checkSchema } = require('express-validator');

const registrationSchema = checkSchema({
  username: {
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: 'Username must be between 5 and 20 characters',
    },
    isAlphanumeric: {
      errorMessage: 'Username must contain only letters and numbers',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Invalid email address',
    },
  },
  password: {
    isStrongPassword: {
      errorMessage: 'Password must be strong',
    },
    matches: {
      options: /^[A-Za-z0-9@#$%^&+=]{8,}$/,
      errorMessage: 'Password must contain at least 8 characters',
    },
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      },
    },
  },
});

app.post('/register', registrationSchema, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with user registration
});
```

In this schema, we have a `confirmPassword` field with a custom validation function that compares the `confirmPassword` value with the `password` value in the request body. If they don't match, an error is thrown.

### Step 2: Handle Custom Validation Function

Inside the `confirmPassword` field definition, we use the `custom` method to define a custom validation function. This function takes two parameters: `value` (the field value being validated) and `{ req }` (the request object).

The custom function checks if the `confirmPassword` value matches the `password` value in the request body. If they match, the function returns `true`, indicating that the validation passed. Otherwise, it throws an error with the message "Passwords do not match".

### Step 3: Register Route and Handle Validation Errors

In your route handler for registration (`/register`), apply the validation schema using `checkSchema`. After processing the request, check if there are validation errors using `validationResult`. If there are errors, return a response with a status code of 400 and the array of error messages.

```javascript
app.post('/register', checkSchema(registrationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jso
```

## Creating a Middleware to Catch Validation Results

Express-Validator allows you to create custom middleware functions to handle validation results and process them according to your application's needs. This is useful for centralizing error handling logic and providing consistent responses for validation errors. Let's create a middleware to catch validation results and format them into a structured response.

### Step 1: Define the Middleware

Create a new file named `validationMiddleware.js` (or any preferred name) in your project's directory. This file will contain the custom middleware function for handling validation results.

```javascript
const { validationResult } = require('express-validator');

const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = handleValidationResult;
```
In this middleware, we use the validationResult function from Express-Validator to retrieve validation errors from the request object (req). If there are validation errors, we return a JSON response with a status code of 400 and the array of error messages. Otherwise, we call next() to proceed to the next middleware or route handler in the request chain.

### Step 2: Implement the Middleware in Your Express App
Now, import and use the custom middleware in your Express app's main file (`app.js` or similar).
```javascript
const express = require('express');
const handleValidationResult = require('./validationMiddleware'); // Import the custom middleware

const app = express();
app.use(express.json());

// Define routes and validation rules here
// ...

app.post(
  '/submit',
  someSchemaValidator,
  handleValidationResult, // Apply the custom middleware to catch validation results
  (req, res) => {
    // Proceed with handling the valid data
    // ...
    res.status(200).json({ message: 'Data submitted successfully' });
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
In this example, we import the custom middleware handleValidationResult and use it as a middleware in the route handler for submitting data (/submit). When validation errors occur, the middleware catches them and returns a structured JSON response with the error messages. If validation passes, the route handler proceeds with handling the valid data.


