var urlManager = function() {

  var urlConstructor = function(codedUrl, skill, role, location) {
      var codedURL = codedUrl;
      codedURL = codedURL.replace('{{skill}}',skill);
      codedURL = codedURL.replace('{{role}}',role);
      codedURL = codedURL.replace('{{location}}',location);
      return codedURL;
  };
  return {
    urlConstructor: urlConstructor
  };
}();

module.exports = urlManager;
