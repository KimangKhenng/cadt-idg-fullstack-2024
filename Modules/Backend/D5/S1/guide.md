# D5 S1: Role-Based Access Control (RBAC) 

## Define Roles
we can create `roles.js` in `/roles` direcory to store role.
```js
//roles.js
const roles = [
  {
    name: "admin",
    permissions: [
      "create_record",
      "read_record",
      "update_record",
      "delete_record",
      "update_own_record",
      "delete_own_record",
    ]
  },
  {
    name: "editor",
    permissions: [
      "create_record",
      "read_record",
      "update_record",
      "update_own_record",
      "delete_own_record",
    ]
  },
  {
    name: "user",
    permissions: [
      "create_record",
      "read_record",
      "update_own_record",
      "delete_own_record",
    ]
  }
];
```
We need to create function to retrive and check if a permission has certain roles.
```js
//roles.js
getPermissionsByRoleName(roleName) {
  const role = roles.find((r) => r.name === roleName);
  return role ? role.permissions : [];
}

modules.export = { getPermissionsByRoleName }
```

We need to modify user's model to include role property. For now, we can go for basic role base authrization.
```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  ... // Other property
  role: {
    enum: ["user", "editor", "admin"],
    default: 'user'
  }
  ...
  
})
const User = mongoose.model('User', userSchema)
module.exports = User
```
## Role checking middleware
We need to create a middleware to check if requesting user have a valid role to pass.
```js
const authroize = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(401); // Unauthorized
        }
        const userRole = req.user ? req.user.role : 'anonymous'
        const permissions = getPermissionsByRoleName(userRole)
        if (permissions.includes(permission)) {
          return next()
        } else {
          return res.status(403).json({ error: 'Access denied' });
        }
    }
}
```
## Using middleware
Finally we can use `authroize` middleware where we need certain permission
```js
bookRouter.get('/', authroize('read_record'), getBooks)
```

