# D3 S3: Improve JWT Login with Passport.js

Watch recorded video: https://youtu.be/iai2HjzmmIE

## What is Passport.js?
[Passport.js](https://www.passportjs.org/) is an authentication middleware for Node.js that provides a simple and modular way to authenticate users in web applications. It supports various authentication strategies, including local username/password, OAuth, and OpenID, among others.
Passport.js simplifies the process of implementing authentication by providing a consistent interface and handling common tasks such as session management and user serialization.

## Why use Passport.js with JWT?
While JWT tokens are a popular choice for stateless authentication, they lack some of the features provided by traditional session-based authentication mechanisms. Passport.js can be used in conjunction with JWT tokens to provide additional functionality, such as session management, user serialization, and authentication strategies.

## JWT strategy with Passport.js
Passport.js provides a JWT strategy that can be used to authenticate users based on JWT tokens. This strategy verifies the token's signature and decodes the payload to extract user information. By using the JWT strategy, you can integrate JWT tokens into your existing Passport.js authentication workflow and take advantage of Passport.js's features.
We can start by create `strategies` folders in `src` folder and create `jwt.js` file in it. Then, we can add the following code to `jwt.js`:

```javascript
const passport = require('passport');
const { JwtStrategy, ExtractJwt } = require('passport-jwt').Strategy
const { UserModel } = require('../models/User')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id)
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
      return done(error, false);
    }
});
``` 
Then, we can add the following code to `src/app.js`:
```javascript
const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');
passport.use(jwtStrategy);
```
Now, we can use the JWT strategy in our routes by adding the following code to the route file:
```javascript
const passport = require('passport');
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});
```
The reason we specify `{ session: false }` is because we are using JWT tokens, which are stateless and do not require a session to be maintained.
By setting `session` to `false`, we are telling Passport.js not to create a session for the user as JWT tokens are self-contained and do not require server-side storage.

