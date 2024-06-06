# D4 S1: Let's Review JS

Watch recorded class: https://youtu.be/rvW21-qVAIY

## Object Destructuring

Object destructuring is a convenient way to extract values from objects and assign them to variables. It allows you to unpack properties from objects into distinct variables.

### Basic Syntax

Here's a simple example of object destructuring:

```javascript
const person = {
    name: 'John Doe',
    age: 30,
    profession: 'Software Developer'
};

// Destructuring assignment
const { name, age, profession } = person;

console.log(name); // John Doe
console.log(age); // 30
console.log(profession); // Software Developer
```

### Renaming Variables
You can also rename variables while destructuring:

```javascript
const user = {
    username: 'johndoe',
    email: 'john.doe@example.com'
};

// Renaming variables
const { username: user, email: mail } = user;

console.log(user); // johndoe
console.log(mail); // john.doe@example.com
```

### Default Values
If the property does not exist in the object, you can assign a default value:
```javascript
const settings = {
    theme: 'dark'
};

// Default value
const { theme, fontSize = '16px' } = settings;

console.log(theme); // dark
console.log(fontSize); // 16px (default value)
```

### Nested Destructuring
You can destructure nested objects as well:
```javascript
const employee = {
    name: 'Jane Smith',
    position: {
        title: 'Manager',
        department: 'Sales'
    }
};

// Nested destructuring
const { name, position: { title, department } } = employee;

console.log(name); // Jane Smith
console.log(title); // Manager
console.log(department); // Sales
```
## Async Promises
Promises are used to handle asynchronous operations in JavaScript. They represent a value that may be available now, in the future, or never.

### Creating a Promise
To create a promise, you use the `Promise` constructor:
```javascript
const myPromise = new Promise((resolve, reject) => {
    // Perform an asynchronous operation
    let success = true;

    if (success) {
        resolve('Operation was successful!');
    } else {
        reject('Operation failed!');
    }
});
```

### Using `then` and `catch`
Once a promise is created, you can handle its resolved or rejected state using then and catch methods

```javascript
myPromise
    .then((message) => {
        console.log(message); // Operation was successful!
    })
    .catch((error) => {
        console.error(error); // Operation failed!
    });
```

### Async/Await
`async` and `await` provide a more readable way to work with promises:

```js
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
```

### Error Handling
Error handling with async/await can be done using try/catch blocks:
```js
async function getUserData() {
    try {
        const user = await getUser();
        const posts = await getUserPosts(user.id);
        console.log(posts);
    } catch (error) {
        console.error('Error:', error);
    }
}

getUserData();
```