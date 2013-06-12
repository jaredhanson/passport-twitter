var vows = require('vows');
var assert = require('assert');
var util = require('util');
var TwitterStrategy = require('passport-twitter/strategy');


vows.describe('TwitterStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should be named twitter': function (strategy) {
      assert.equal(strategy.name, 'twitter');
    },
  },
  
  'strategy user authorization params': {
    topic: function() {
      return new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should return empty object when parsing invalid options': function (strategy) {
      var params = strategy.userAuthorizationParams({ foo: 'bar' });
      assert.lengthOf(Object.keys(params), 0);
    },
    'should return force_login': function (strategy) {
      var params = strategy.userAuthorizationParams({ forceLogin: true });
      assert.equal(params.force_login, true);
    },
    'should return screen_name': function (strategy) {
      var params = strategy.userAuthorizationParams({ screenName: 'bob' });
      assert.equal(params.screen_name, 'bob');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        if (url == 'https://api.twitter.com/1.1/users/show.json?user_id=123') {
          var body = '{"id_str":"6253282","id":6253282,"profile_text_color":"437792","created_at":"Wed May 23 06:01:13 +0000 2007","contributors_enabled":true,"follow_request_sent":null,"lang":"en","listed_count":10154,"profile_sidebar_border_color":"0094C2","show_all_inline_media":false,"friends_count":34,"utc_offset":-28800,"location":"San Francisco, CA","name":"Twitter API","profile_background_tile":false,"profile_sidebar_fill_color":"a9d9f1","profile_image_url_https":"https:\/\/si0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","protected":false,"geo_enabled":true,"following":null,"default_profile_image":false,"statuses_count":3252,"is_translator":false,"favourites_count":22,"profile_background_color":"e8f2f7","description":"The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Do not get an answer? It is on my website.","time_zone":"Pacific Time (US & Canada)","screen_name":"twitterapi","profile_background_image_url":"http:\/\/a0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","profile_image_url":"http:\/\/a0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","profile_link_color":"0094C2","profile_background_image_url_https":"https:\/\/si0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","followers_count":931299,"status":{"in_reply_to_status_id_str":null,"in_reply_to_user_id_str":null,"retweeted":false,"coordinates":null,"in_reply_to_screen_name":null,"created_at":"Tue Feb 14 23:39:43 +0000 2012","possibly_sensitive":false,"contributors":null,"in_reply_to_status_id":null,"entities":{"urls":[{"display_url":"tmblr.co\/ZgBqayGQi3ls","indices":[106,126],"expanded_url":"http:\/\/tmblr.co\/ZgBqayGQi3ls","url":"http:\/\/t.co\/cOzUfFNW"}],"user_mentions":[],"hashtags":[]},"geo":null,"in_reply_to_user_id":null,"place":null,"favorited":false,"truncated":false,"id_str":"169566520693882882","id":169566520693882882,"retweet_count":82,"text":"Photo Upload Issue - Some users may be experiencing an issue when uploading a photo. Our engineers are... http:\/\/t.co\/cOzUfFNW"},"default_profile":false,"notifications":null,"url":"http:\/\/dev.twitter.com","profile_use_background_image":true,"verified":true}';
          callback(null, body, undefined);
        } else {
          callback(new Error('something is wrong'));
        }
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', { user_id: '123' }, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'twitter');
        assert.equal(profile.id, '6253282');
        assert.equal(profile.username, 'twitterapi');
        assert.equal(profile.displayName, 'Twitter API');
        assert.equal(profile.photos[0].value, 'https://si0.twimg.com/profile_images/1438634086/avatar_normal.png');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property' : function(err, profile) {
        assert.isObject(profile._json);
      },
    },
  },
  
  'strategy when loading user profile with user profile url option': {
    topic: function() {
      var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret',
        userProfileURL: 'https://foo.api.twitter.com/1.2/users/show.json'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        if (url == 'https://foo.api.twitter.com/1.2/users/show.json?user_id=123') {
          var body = '{"id_str":"6253282","id":6253282,"profile_text_color":"437792","created_at":"Wed May 23 06:01:13 +0000 2007","contributors_enabled":true,"follow_request_sent":null,"lang":"en","listed_count":10154,"profile_sidebar_border_color":"0094C2","show_all_inline_media":false,"friends_count":34,"utc_offset":-28800,"location":"San Francisco, CA","name":"Twitter API","profile_background_tile":false,"profile_sidebar_fill_color":"a9d9f1","profile_image_url_https":"https:\/\/si0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","protected":false,"geo_enabled":true,"following":null,"default_profile_image":false,"statuses_count":3252,"is_translator":false,"favourites_count":22,"profile_background_color":"e8f2f7","description":"The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Do not get an answer? It is on my website.","time_zone":"Pacific Time (US & Canada)","screen_name":"twitterapi","profile_background_image_url":"http:\/\/a0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","profile_image_url":"http:\/\/a0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","profile_link_color":"0094C2","profile_background_image_url_https":"https:\/\/si0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","followers_count":931299,"status":{"in_reply_to_status_id_str":null,"in_reply_to_user_id_str":null,"retweeted":false,"coordinates":null,"in_reply_to_screen_name":null,"created_at":"Tue Feb 14 23:39:43 +0000 2012","possibly_sensitive":false,"contributors":null,"in_reply_to_status_id":null,"entities":{"urls":[{"display_url":"tmblr.co\/ZgBqayGQi3ls","indices":[106,126],"expanded_url":"http:\/\/tmblr.co\/ZgBqayGQi3ls","url":"http:\/\/t.co\/cOzUfFNW"}],"user_mentions":[],"hashtags":[]},"geo":null,"in_reply_to_user_id":null,"place":null,"favorited":false,"truncated":false,"id_str":"169566520693882882","id":169566520693882882,"retweet_count":82,"text":"Photo Upload Issue - Some users may be experiencing an issue when uploading a photo. Our engineers are... http:\/\/t.co\/cOzUfFNW"},"default_profile":false,"notifications":null,"url":"http:\/\/dev.twitter.com","profile_use_background_image":true,"verified":true}';
          callback(null, body, undefined);
        } else {
          callback(new Error('something is wrong'));
        }
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', { user_id: '123' }, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'twitter');
        assert.equal(profile.id, '6253282');
        assert.equal(profile.username, 'twitterapi');
        assert.equal(profile.displayName, 'Twitter API');
        assert.equal(profile.photos[0].value, 'https://si0.twimg.com/profile_images/1438634086/avatar_normal.png');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property' : function(err, profile) {
        assert.isObject(profile._json);
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        callback(new Error('something went wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError' : function(err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },
  
  'strategy when loading user profile without extended info': {
    topic: function() {
      var strategy = new TwitterStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret',
        skipExtendedUserProfile: true
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        var body = '{"id_str":"6253282","id":6253282,"profile_text_color":"437792","created_at":"Wed May 23 06:01:13 +0000 2007","contributors_enabled":true,"follow_request_sent":null,"lang":"en","listed_count":10154,"profile_sidebar_border_color":"0094C2","show_all_inline_media":false,"friends_count":34,"utc_offset":-28800,"location":"San Francisco, CA","name":"Twitter API","profile_background_tile":false,"profile_sidebar_fill_color":"a9d9f1","profile_image_url_https":"https:\/\/si0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","protected":false,"geo_enabled":true,"following":null,"default_profile_image":false,"statuses_count":3252,"is_translator":false,"favourites_count":22,"profile_background_color":"e8f2f7","description":"The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Do not get an answer? It is on my website.","time_zone":"Pacific Time (US & Canada)","screen_name":"twitterapi","profile_background_image_url":"http:\/\/a0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","profile_image_url":"http:\/\/a0.twimg.com\/profile_images\/1438634086\/avatar_normal.png","profile_link_color":"0094C2","profile_background_image_url_https":"https:\/\/si0.twimg.com\/profile_background_images\/229557229\/twitterapi-bg.png","followers_count":931299,"status":{"in_reply_to_status_id_str":null,"in_reply_to_user_id_str":null,"retweeted":false,"coordinates":null,"in_reply_to_screen_name":null,"created_at":"Tue Feb 14 23:39:43 +0000 2012","possibly_sensitive":false,"contributors":null,"in_reply_to_status_id":null,"entities":{"urls":[{"display_url":"tmblr.co\/ZgBqayGQi3ls","indices":[106,126],"expanded_url":"http:\/\/tmblr.co\/ZgBqayGQi3ls","url":"http:\/\/t.co\/cOzUfFNW"}],"user_mentions":[],"hashtags":[]},"geo":null,"in_reply_to_user_id":null,"place":null,"favorited":false,"truncated":false,"id_str":"169566520693882882","id":169566520693882882,"retweet_count":82,"text":"Photo Upload Issue - Some users may be experiencing an issue when uploading a photo. Our engineers are... http:\/\/t.co\/cOzUfFNW"},"default_profile":false,"notifications":null,"url":"http:\/\/dev.twitter.com","profile_use_background_image":true,"verified":true}';
        
        throw new Error('OAuth request should not be issued when extended user profile is disabled');
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {"user_id":"1705","screen_name":"jaredhanson"}, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'twitter');
        assert.equal(profile.id, '1705');
        assert.equal(profile.username, 'jaredhanson');
      },
    },
  },
  
  'strategy handling a request that has been denied': {
    topic: function() {
      var strategy = new TwitterStrategy({
          consumerKey: 'ABC123',
          consumerSecret: 'secret'
        },
        function() {}
      );
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(new Error('should-not-be-called'));
        }
        strategy.fail = function() {
          self.callback(null, req);
        }
        
        req.query = {};
        req.query.denied = 'token';
        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not call success' : function(err, req) {
        assert.isNull(err);
      },
      'should call fail' : function(err, req) {
        assert.isNotNull(req);
      },
    },
  },
  
}).export(module);
