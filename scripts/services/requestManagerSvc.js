var q = require('q');
var request = require('request');
var urlManager = require('./urlManagerSvc');
var scrapperX = require('./scrapperX');
var _ = require('lodash');

var requestManager = function() {

  var fetchAllResponses = function(allSiteConfigs, substitutions) {
    var promiseArray = [];

    _.forEach(allSiteConfigs, function(eachSiteConfigObject) {
      var defer = q.defer();
      var siteName = _.keys(eachSiteConfigObject)[0];
      var siteJsonConfig = JSON.parse(eachSiteConfigObject[siteName]);
      siteJsonConfig.url = urlManager.urlConstructor(siteJsonConfig.url, substitutions);
      console.log('Scrapping : ', siteName, ' Url:', siteJsonConfig.url);

      request.get({
        url: siteJsonConfig.url,
        headers: {
          'Content-Type:': 'text/plain'
        }
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          defer.resolve(scrapperX.scrape(body, siteJsonConfig));
        } else {
          console.log('Error for ', siteName, response.statusCode, response);
          defer.reject(error);
        }
      });
      promiseArray.push(defer.promise);
    });
    return q.all(promiseArray);
  };

  return {
    fetchAllResponses: fetchAllResponses
  };
}();

module.exports = requestManager;
