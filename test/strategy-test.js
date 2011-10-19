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
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        process.nextTick(function () {
          strategy.userProfile('', '', {"user_id":"1705","screen_name":"jaredhanson"}, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
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
