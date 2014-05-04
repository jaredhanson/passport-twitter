// requires modules ===========================================================
var passport        = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

// assigns tokens =============================================================
var twitterAuth = {
  'consumerKey'   : 'Insert Your consumerKey Here',
  'consumerSecret': 'Insert Your consumerSecret Here',
  'callbackURL'   : 'http://localhost:8080/auth/twitter/callback'
};

// configures passport ========================================================
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});

passport.use(new TwitterStrategy({
  consumerKey     : twitterAuth.consumerKey,
  consumerSecret  : twitterAuth.consumerSecret,
  callbackURL     : twitterAuth.callbackURL
  },
  function(req, token, tokenSecret, profile, done) {      
    process.nextTick(function () {
      return done(null, profile);
    });
  })
);  