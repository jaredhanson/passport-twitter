var TwitterStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('handling API errors', function() {
  });
    
  describe('handling malformed responses', function() {
    var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret',
        userProfileURL: 'https://api.twitter.com/1.1/users/show.json'
      },
      function() {});
    
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        if (url != 'https://api.twitter.com/1.1/users/show.json?user_id=123') { return callback(new Error('incorrect url argument')); }
        if (token != 'token') { return callback(new Error('incorrect token argument')); }
      
        var body = 'Hello, world.';
        callback(null, body, undefined);
      }
    
    describe('loading profile', function() {
      var err, profile;
    
      before(function(done) {
        strategy.userProfile('token', 'token-secret', { user_id: '123' }, function(e, p) {
          err = e;
          profile = p;
          done();
        });
      });
    
      it('should error', function() {
        expect(err).to.be.an.instanceOf(Error);
        expect(err.message).to.equal('Failed to parse user profile');
      });
    });
  });
  
});
