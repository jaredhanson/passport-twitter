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
  profile.id = json.id;
  profile.username = json.screen_name;
  profile.displayName = json.name;
  profile.photos = [{ value: json.profile_image_url_https }];
  
  return profile;
};
