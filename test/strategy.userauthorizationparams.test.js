var chai = require('chai')
  , TwitterStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret'
    },
    function() {});
  
  strategy._oauth.getOAuthRequestToken = function(extraParams, callback) {
    callback(null, 'hh5s93j4hdidpola', 'hdhd0244k9j7ao03', {});
  }
  
  describe('handling a request to be redirected with provider-specific params', function() {
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
  
});
