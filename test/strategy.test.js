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
  
});
