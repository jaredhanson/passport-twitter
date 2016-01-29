var chai = require('chai')
  , TwitterStrategy = require('../lib/strategy');


describe('Strategy', function() {
  
  describe('constructed', function() {
    var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      }, function(){});
    
    it('should be named twitter', function() {
      expect(strategy.name).to.equal('twitter');
    });
  })
  
  describe('authorization request with parameters', function() {
    var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      }, function(){});
    
    strategy._oauth.getOAuthRequestToken = function(extraParams, callback) {
      callback(null, 'hh5s93j4hdidpola', 'hdhd0244k9j7ao03', {});
    }
    
    
    var url;
  
    before(function(done) {
      chai.passport(strategy)
        .redirect(function(u) {
          url = u;
          done();
        })
        .req(function(req) {
          req.session = {};
        })
        .authenticate({ screenName: 'bob', forceLogin: true });
    });
  
    it('should be redirected', function() {
      expect(url).to.equal('https://api.twitter.com/oauth/authenticate?oauth_token=hh5s93j4hdidpola&force_login=true&screen_name=bob');
    });
  });
  
  describe('failure caused by user denying request', function() {
    var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      }, function(){});
    
    
    var info;
  
    before(function(done) {
      chai.passport(strategy)
        .fail(function(i) {
          info = i;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query.denied = '8L74Y149';
        })
        .authenticate();
    });
  
    it('should fail', function() {
      expect(info).to.be.undefined;
    });
  });
  
  describe('error caused by invalid consumer secret sent to request token URL', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'invalid-secret',
      callbackURL: 'http://www.example.test/callback'
    }, function verify(){});
    
    strategy._oauth.getOAuthRequestToken = function(params, callback) {
      callback({ statusCode: 401, data: '{"errors":[{"code":32,"message":"Could not authenticate you."}]}' });
    }
    
    
    var err;
  
    before(function(done) {
      chai.passport(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.session = {};
        })
        .authenticate();
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal("Could not authenticate you.");
    });
  });
  
  describe('error caused by invalid callback sent to request token URL', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret',
      callbackURL: 'http://www.example.test/invalid-callback'
    }, function verify(){});
    
    strategy._oauth.getOAuthRequestToken = function(params, callback) {
      callback({ statusCode: 401, data: '<?xml version="1.0" encoding="UTF-8"?>\n<hash>\n  <error>This client application\'s callback url has been locked</error>\n  <request>/oauth/request_token</request>\n</hash>\n' });
    }
    
    
    var err;
  
    before(function(done) {
      chai.passport(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.session = {};
        })
        .authenticate();
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal("This client application's callback url has been locked");
    });
  });
  
  describe('error caused by invalid request token sent to access token URL', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret',
      callbackURL: 'http://www.example.test/callback'
    }, function verify(){});
    
    strategy._oauth.getOAuthAccessToken = function(token, tokenSecret, verifier, callback) {
      callback({ statusCode: 401, data: 'Invalid request token.' });
    }
    
    
    var err;
  
    before(function(done) {
      chai.passport(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query['oauth_token'] = 'x-hh5s93j4hdidpola';
          req.query['oauth_verifier'] = 'hfdp7dh39dks9884';
          req.session = {};
          req.session['oauth:twitter'] = {};
          req.session['oauth:twitter']['oauth_token'] = 'x-hh5s93j4hdidpola';
          req.session['oauth:twitter']['oauth_token_secret'] = 'hdhd0244k9j7ao03';
        })
        .authenticate();
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal("Invalid request token.");
    });
  });
  
  describe('error caused by invalid verifier sent to access token URL', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret',
      callbackURL: 'http://www.example.test/callback'
    }, function verify(){});
    
    strategy._oauth.getOAuthAccessToken = function(token, tokenSecret, verifier, callback) {
      callback({ statusCode: 401, data: 'Error processing your OAuth request: Invalid oauth_verifier parameter' });
    }
    
    
    var err;
  
    before(function(done) {
      chai.passport(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query['oauth_token'] = 'hh5s93j4hdidpola';
          req.query['oauth_verifier'] = 'x-hfdp7dh39dks9884';
          req.session = {};
          req.session['oauth:twitter'] = {};
          req.session['oauth:twitter']['oauth_token'] = 'hh5s93j4hdidpola';
          req.session['oauth:twitter']['oauth_token_secret'] = 'hdhd0244k9j7ao03';
        })
        .authenticate();
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal("Error processing your OAuth request: Invalid oauth_verifier parameter");
    });
  });
  
});
