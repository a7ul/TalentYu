var _ = require('lodash');
var urlManager = function() {

  var urlConstructor = function(codedUrl, substitutions) {
    var replacementKeywordsFromRequest = _.keys(substitutions);
    console.log('substitutions from request', substitutions);
    var codedURL = _.clone(codedUrl);
    var allUrls = [];
    _.forEach(replacementKeywordsFromRequest, function(keyword) {
      if (keyword !== 'page') {
        codedURL = codedURL.replace('{{' + keyword + '}}', substitutions[keyword]);
      }
    });
    if (!!substitutions.page && codedURL.search('{{page}}')!== -1) {
      for (var p = 1; p <= parseInt(substitutions.page); ++p) {
        allUrls.push(codedURL.replace('{{page}}', p));
      }
    } else {
      allUrls.push(codedURL);
    }
    return allUrls;
  };
  return {
    urlConstructor: urlConstructor
  };
}();

module.exports = urlManager;
