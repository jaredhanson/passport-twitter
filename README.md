# passport-twitter

[![Build](https://img.shields.io/travis/jaredhanson/passport-twitter.svg)](https://travis-ci.org/jaredhanson/passport-twitter)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/passport-twitter.svg)](https://coveralls.io/r/jaredhanson/passport-twitter)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/passport-twitter.svg?label=quality)](https://codeclimate.com/github/jaredhanson/passport-twitter)
[![Dependencies](https://img.shields.io/david/jaredhanson/passport-twitter.svg)](https://david-dm.org/jaredhanson/passport-twitter)



[Passport](http://passportjs.org/) strategy for authenticating with [Twitter](http://twitter.com/)
using the OAuth 1.0a API.

This module lets you authenticate using Twitter in your Node.js applications.
By plugging into Passport, Twitter authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-twitter

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

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'twitter'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/twitter',
      passport.authenticate('twitter'));
    
    app.get('/auth/twitter/callback', 
      passport.authenticate('twitter', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-twitter-example)
as a starting point for their own web applications.

## Contributing

#### Tests

The test suite is located in the `test/` directory.  All new features are
expected to have corresponding test cases.  Ensure that the complete test suite
passes by executing:

```bash
$ make test
```

#### Coverage

The test suite covers 100% of the code base.  All new feature development is
expected to maintain that level.  Coverage reports can be viewed by executing:

```bash
$ make test-cov
$ make view-cov
```

## Support

#### Funding

This software is provided to you as open source, free of charge.  The time and
effort to develop and maintain this project is dedicated by [@jaredhanson](https://github.com/jaredhanson).
If you (or your employer) benefit from this project, please consider a financial
contribution.  Your contribution helps continue the efforts that produce this
and other open source software.

Funds are accepted via [PayPal](https://paypal.me/jaredhanson), [Venmo](https://venmo.com/jaredhanson),
and [other](http://jaredhanson.net/pay) methods.  Any amount is appreciated.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
