var _ = require('lodash');
var urlManager = function() {

  var urlConstructor = function(codedUrl, substitutions) {
    var replacementKeywordsFromRequest = _.keys(substitutions);
    console.log('substitutions from request', substitutions);
    var codedURL = _.clone(codedUrl);
    _.forEach(replacementKeywordsFromRequest, function(keyword) {
      codedURL = codedURL.replace('{{' + keyword + '}}', substitutions[keyword]);
    });
    return codedURL;
  };
  return {
    urlConstructor: urlConstructor
  };
}();

module.exports = urlManager;
