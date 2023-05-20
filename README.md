# passport-twitter

[Passport](https://www.passportjs.org/) strategy for authenticating with
[Twitter](https://www.passportjs.org/features/twitter/) using [OAuth 1.0a](https://www.passportjs.org/features/oauth/).

This module lets you authenticate using Twitter in your Node.js applications.
By plugging into Passport, Twitter authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect#readme)-style middleware,
including [Express](https://expressjs.com/).

<div align="center">

:brain: [Understanding OAuth 1.0](https://www.passportjs.org/concepts/oauth/?utm_source=github&utm_medium=referral&utm_campaign=passport-twitter&utm_content=nav-concept) •
:heart: [Sponsors](https://www.passportjs.org/sponsors/?utm_source=github&utm_medium=referral&utm_campaign=passport-twitter&utm_content=nav-sponsors)

</div>

<div align="right">
  <sup>Developed by <a href="#authors">Jared Hanson</a>.</sub>
</div>

---

<div align="center">
  <sup>Advertisement</sup>
  <br>
  <a href="https://click.linksynergy.com/link?id=D*o7yui4/NM&offerid=507388.922484&type=2&murl=https%3A%2F%2Fwww.udemy.com%2Fcourse%2Fthe-complete-nodejs-developer-course-2%2F&u1=nzQ4K5UpDje9RRkYGfU82wFPXFWOCHAv5M0gEu5tJJH">The Complete Node.js Developer Course</a><br>Learn Node. js by building real-world applications with Node, Express, MongoDB, Jest, and more!
</div>

---

## Install

```bash
$ npm install passport-twitter
```

## Usage

#### Create an Application

Before using `passport-twitter`, you must register an application with Twitter.
If you have not already done so, a new application can be created at
[Twitter Application Management](https://apps.twitter.com/).  Your application
will be issued a consumer key (API Key) and consumer secret (API Secret), which
need to be provided to the strategy.  You will also need to configure a callback
URL which matches the route in your application.

#### Configure Strategy

The Twitter authentication strategy authenticates users using a Twitter account
and OAuth tokens.  The consumer key and consumer secret obtained when creating
an application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and
corresponding secret as arguments, as well as `profile` which contains the
authenticated user's Twitter profile.   The `verify` callback must call `cb`
providing a user to complete authentication.

```javascript
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'twitter'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-twitter-example)
as a starting point for their own web applications.

## Authors

- [Jared Hanson](https://www.jaredhanson.me/) { [![WWW](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/globe-12x12.svg)](https://www.jaredhanson.me/) [![Facebook](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/facebook-12x12.svg)](https://www.facebook.com/jaredhanson) [![LinkedIn](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/linkedin-12x12.svg)](https://www.linkedin.com/in/jaredhanson) [![Twitter](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/twitter-12x12.svg)](https://twitter.com/jaredhanson) [![GitHub](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/github-12x12.svg)](https://github.com/jaredhanson) }

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2023 Jared Hanson
