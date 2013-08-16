var fs = require('fs')
  , parse = require('../lib/profile').parse;


describe('profile.parse', function() {
    
  describe('example profile', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/data/example.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = parse(data);
        console.log(profile);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.id).to.equal('795649');
      expect(profile.username).to.equal('rsarver');
      expect(profile.displayName).to.equal('Ryan Sarver');
      expect(profile.photos[0].value).to.equal('https://si0.twimg.com/profile_images/1777569006/image1327396628_normal.png');
    });
  });
  
});
