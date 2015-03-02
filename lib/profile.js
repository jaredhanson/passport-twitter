/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  
  var profile = {};
  profile.id = String(json.id);
  if (json.id_str) { profile.id = json.id_str; }
  profile.username = json.screen_name;
  profile.displayName = json.name;
  profile.profileUrl = "https://twitter.com/" + profile.username;
  profile.photos = [{ value: json.profile_image_url_https }];
  
  return profile;
};
