var chai = require('chai')
  , TwitterStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('parsing error from request token endpoint', function() {
    var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    
      // mock
      strategy._oauth.getOAuthRequestToken = function(extraParams, callback) {
        callback({ statusCode: 401, data: 'Failed to validate oauth signature and token' });
      }
    
    describe('parsing error', function() {
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
        expect(err.message).to.equal('Failed to validate oauth signature and token');
      });
    });
  });
  
  describe('parsing error from access token endpoint', function() {
    var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    
      // mock
      strategy._oauth.getOAuthAccessToken = function(token, tokenSecret, verifier, callback) {
        callback({ statusCode: 401, data: '<?xml version="1.0" encoding="UTF-8"?> <hash> <error>Invalid / expired Token</error> <request>/oauth/access_token</request> </hash>' });
      }
    
    describe('parsing error', function() {
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
            req.query['oauth_verifier'] = 'hfdp7dh39dks9884';
            req.session = {};
            req.session['oauth:twitter'] = {};
            req.session['oauth:twitter']['oauth_token'] = 'hh5s93j4hdidpola';
            req.session['oauth:twitter']['oauth_token_secret'] = 'hdhd0244k9j7ao03';
          })
          .authenticate();
      });
    
      it('should error', function() {
        expect(err).to.be.an.instanceOf(Error);
        expect(err.message).to.equal('Invalid / expired Token');
      });
    });
  });
  
});
