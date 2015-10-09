var q = require('q');
var request = require('request');
var urlManager = require('./urlManagerSvc');
var scrapperX = require('scrapper-x');
var _ = require('lodash');

var requestManager = function() {

  var fetchAllResponses = function(allSiteConfigs, substitutions) {
    var promiseArray = [];

    _.forEach(allSiteConfigs, function(eachSiteConfigObject) {
      var siteName = _.keys(eachSiteConfigObject)[0];
      var siteJsonConfig = JSON.parse(eachSiteConfigObject[siteName]);
      siteJsonConfig.url = urlManager.urlConstructor(siteJsonConfig.url, substitutions);
      console.log('Scrapping : ', siteName, ' Urls:', siteJsonConfig.url);

      _.forEach(siteJsonConfig.url,function(eachUrl){
        console.log(eachUrl);
        var defer = q.defer();
        request.get({
          url: eachUrl,
          headers: {
            'Content-Type': 'text/plain',
            'origin': 'http://localhost',
          }
        }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            defer.resolve(scrapperX.scrape(body, siteJsonConfig));
          } else {
            console.log('Error for ', siteName, response.statusCode, response);
            defer.resolve([]);
          }
        });
        promiseArray.push(defer.promise);
      });

    });
    return q.all(promiseArray);
  };

  return {
    fetchAllResponses: fetchAllResponses
  };
}();

module.exports = requestManager;
