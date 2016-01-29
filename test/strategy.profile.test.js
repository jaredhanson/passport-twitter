var TwitterStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
    
  describe('fetched from legacy users/show endpoint', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret',
      userProfileURL: 'https://api.twitter.com/1.1/users/show.json'
    }, function verify(){});
    
    strategy._oauth.get = function(url, token, tokenSecret, callback) {
      if (url != 'https://api.twitter.com/1.1/users/show.json?user_id=6253282') { return callback(new Error('incorrect url argument')); }
      if (token != 'token') { return callback(new Error('incorrect token argument')); }
      if (tokenSecret != 'token-secret') { return callback(new Error('incorrect tokenSecret argument')); }
    
      var body = '{"id_str":"6253282","id":6253282,"profile_text_color":"437792","created_at":"Wed May 23 06:01:13 +0000 2007","contributors_enabled":true,"follow_request_sent":null,"lang":"en","listed_count":10154,"profile_sidebar_border_color":"0094C2","show_all_inline_media":false,"friends_count":34,"utc_offset":-28800,"location":"San Francisco, CA","name":"Twitter API","profile_background_tile":false,"profile_sidebar_fill_color":"a9d9f1","profile_image_url_https":"https:\/\/si0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","protected":false,"geo_enabled":true,"following":null,"default_profile_image":false,"statuses_count":3252,"is_translator":false,"favourites_count":22,"profile_background_color":"e8f2f7","description":"The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Do not get an answer? It is on my website.","time_zone":"Pacific Time (US & Canada)","screen_name":"twitterapi","profile_background_image_url":"http:\/\/a0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","profile_image_url":"http:\/\/a0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","profile_link_color":"0094C2","profile_background_image_url_https":"https:\/\/si0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","followers_count":931299,"status":{"in_reply_to_status_id_str":null,"in_reply_to_user_id_str":null,"retweeted":false,"coordinates":null,"in_reply_to_screen_name":null,"created_at":"Tue Feb 14 23:39:43 +0000 2012","possibly_sensitive":false,"contributors":null,"in_reply_to_status_id":null,"entities":{"urls":[{"display_url":"tmblr.co\/ZgBqayGQi3ls","indices":[106,126],"expanded_url":"http:\/\/tmblr.co\/ZgBqayGQi3ls","url":"http:\/\/t.co\/cOzUfFNW"}],"user_mentions":[],"hashtags":[]},"geo":null,"in_reply_to_user_id":null,"place":null,"favorited":false,"truncated":false,"id_str":"169566520693882882","id":169566520693882882,"retweet_count":82,"text":"Photo Upload Issue - Some users may be experiencing an issue when uploading a photo. Our engineers are... http:\/\/t.co\/cOzUfFNW"},"default_profile":false,"notifications":null,"url":"http:\/\/dev.twitter.com","profile_use_background_image":true,"verified":true}';
      var response = {headers:{'x-access-level': 'read'}};
      callback(null, body, response);
    }
    
    
    var profile;
  
    before(function(done) {
      strategy.userProfile('token', 'token-secret', { user_id: '6253282' }, function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });
  
    it('should parse profile', function() {
      expect(profile.provider).to.equal('twitter');
      expect(profile.id).to.equal('6253282');
      expect(profile.username).to.equal('twitterapi');
      expect(profile.displayName).to.equal('Twitter API');
      expect(profile.photos[0].value).to.equal('https://si0.twimg.com/profile_images/1438634086/avatar_normal.png');
    });
  
    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });
  
    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  
    it('should set accessLevel property', function() {
      expect(profile._accessLevel).to.equal('read');
    });
    
  }); // fetched from legacy users/show endpoint
  
  describe('failure caused by invalid token', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret',
      userProfileURL: 'https://api.twitter.com/1.1/users/show.json'
    }, function verify(){});
    
    strategy._oauth.get = function(url, token, tokenSecret, callback) {
      var body = '{"errors":[{"message":"Invalid or expired token","code":89}]}';
      callback({ statusCode: 401, data: body });
    }
    
    
    var err, profile;
    
    before(function(done) {
      strategy.userProfile('x-token', 'token-secret', { user_id: '123' }, function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('APIError');
      expect(err.message).to.equal('Invalid or expired token');
      expect(err.code).to.equal(89);
      expect(err.status).to.equal(500);
    });
    
    it('should not supply profile', function() {
      expect(profile).to.be.undefined;
    });
  }); // failure caused by invalid token
  
  describe('failure caused by malformed response', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret',
      userProfileURL: 'https://api.twitter.com/1.1/users/show.json'
    }, function verify(){});
    
    strategy._oauth.get = function(url, token, tokenSecret, callback) {
      var body = 'Hello, world.';
      callback(null, body, undefined);
    }
    
    
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
    
    it('should not supply profile', function() {
      expect(profile).to.be.undefined;
    });
  }); // failure caused by malformed response
  
  describe('internal error', function() {
    var strategy = new TwitterStrategy({
      consumerKey: 'ABC123',
      consumerSecret: 'secret',
      userProfileURL: 'https://api.twitter.com/1.1/users/show.json'
    }, function verify(){});
    
    strategy._oauth.get = function(url, token, tokenSecret, callback) {
      return callback(new Error('something went wrong'));
    }
    
    
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
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });
  
    it('should not supply profile', function() {
      expect(profile).to.be.undefined;
    });
  }); // internal error
  
});
