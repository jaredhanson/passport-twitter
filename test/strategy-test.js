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
