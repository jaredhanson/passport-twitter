// requires modules ===========================================================
var passport = require('passport');

// defines request handlers ===================================================
exports.index = function(req, res) {
  res.render('index.ejs');
};

exports.authTwitter = passport.authenticate('twitter');

exports.authTwitterCallback = passport.authenticate('twitter', {
  successRedirect : '/profile',
  failureRedirect : '/'
});

exports.profile = function(req, res) {
  res.render('profile.ejs', {
    user : req.user
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};