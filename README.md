# passport-twitter

[Passport](http://passportjs.org/) strategy for authenticating with [Twitter](http://twitter.com/)
using the OAuth 1.0a API.

---
<a href="http://www.tkqlhce.com/click-8907558-13433666" target="_top">1Password, the only password manager you should trust.</a>Industry-leading security and award winning design.<img src="http://www.awltovhc.com/image-8907558-13433666" width="1" height="1" border="0"/>
---

This module lets you authenticate using Twitter in your Node.js applications.
By plugging into Passport, Twitter authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

Status:
[![Build](https://img.shields.io/travis/jaredhanson/passport-twitter.svg)](https://travis-ci.org/jaredhanson/passport-twitter)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/passport-twitter.svg?label=quality)](https://codeclimate.com/github/jaredhanson/passport-twitter)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/passport-twitter.svg)](https://coveralls.io/r/jaredhanson/passport-twitter)
[![Dependencies](https://img.shields.io/david/jaredhanson/passport-twitter.svg)](https://david-dm.org/jaredhanson/passport-twitter)


## Sponsorship

Passport is open source software.  Ongoing development is made possible by
generous contributions from [individuals and corporations](https://github.com/jaredhanson/passport/blob/master/SPONSORS.md).
To learn more about how you can help keep this project financially sustainable,
please visit Jared Hanson's page on [Patreon](https://www.patreon.com/jaredhanson).

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

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
