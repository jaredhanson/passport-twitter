var Profile = require('../lib/profile')
  , fs = require('fs');


describe('Profile.parse', function() {
  
  describe('profile obtained from GET account/verify_credentials documentation on 2016/01/28', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/fixtures/account/theSeanCook.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.id).to.equal('38895958');
      expect(profile.username).to.equal('theSeanCook');
      expect(profile.displayName).to.equal('Sean Cook');
      expect(profile.emails).to.be.undefined;
      expect(profile.photos[0].value).to.equal('https://si0.twimg.com/profile_images/1751506047/dead_sexy_normal.JPG');
    });
  });
  
  describe('profile obtained from GET account/verify_credentials documentation on 2016/01/28, with email attribute', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/fixtures/account/theSeanCook-include_email.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.id).to.equal('38895958');
      expect(profile.username).to.equal('theSeanCook');
      expect(profile.displayName).to.equal('Sean Cook');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('theSeanCook@example.test');
      expect(profile.photos[0].value).to.equal('https://si0.twimg.com/profile_images/1751506047/dead_sexy_normal.JPG');
    });
  });
  
  describe('profile obtained from unknown source on unknown date', function() {
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
  
  describe('profile obtained from unknown source on unknown date, without id_str attribute', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/fixtures/users/rsarver-without-id_str.json', 'utf8', function(err, data) {
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
