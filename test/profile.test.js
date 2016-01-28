var Profile = require('../lib/profile')
  , fs = require('fs');


describe('Profile.parse', function() {
    
  describe('profile obtained from documentation at some unknown date', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/fixtures/users/rsarver.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
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
