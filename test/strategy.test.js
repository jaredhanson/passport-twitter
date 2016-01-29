var chai = require('chai')
  , TwitterStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret'
    },
    function() {});
    
  it('should be named twitter', function() {
    expect(strategy.name).to.equal('twitter');
  });
  
  describe('handling a return request in which authorization was denied by user', function() {
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
  
  describe('failure cause by invalid consumer secret sent to request token URL', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'invalid-secret',
      callbackURL: 'http://www.example.test/invalid-callback'
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
          req.query = {};
          req.session = {};
        })
        .authenticate();
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal("Could not authenticate you.");
    });
  });
  
  describe('failure cause by invalid callback sent to request token URL', function() {
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
          req.query = {};
          req.session = {};
        })
        .authenticate();
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal("This client application's callback url has been locked");
    });
  });
  
});
