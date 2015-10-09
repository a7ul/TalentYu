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
             'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
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

    });
    return q.all(promiseArray);
  };

  return {
    fetchAllResponses: fetchAllResponses
  };
}();

module.exports = requestManager;
