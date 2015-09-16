var express = require('express');
var router = express.Router();
var request = require('request');
var newGitSvc = require('../scripts/services/gitSearchSvc');
var gitSvc = new newGitSvc();
var newLinkedSvc = require('../scripts/services/linkedSvc');
var linkedSvc = new newLinkedSvc();
var newIndeedSvc = require('../scripts/services/indeedSvc');
var indeedSvc = new newIndeedSvc();
var cheerio = require('cheerio');
var _ = require('lodash');
var transformer = require('../scripts/services/transformerSvc');

/* GET home page. */
router.get('/', function (req, res, next) {
  var reqUrl = gitSvc.searchGit('c++', 'new york', 1);
  console.log(reqUrl);
  request(reqUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(transformer.formatGithub(JSON.parse(body).results));
    }
  });
  var linkedUrl = linkedSvc.searchLinkedIn("javascript", "developer", "delhi");
  request(linkedUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
    }
  });
  var indeedUrl = indeedSvc.searchIndeed("javascript", "developer", "delhi");
  request(indeedUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var results = $('.resultsList li .sre-content');
      var processedResults = _.map(results, function (candidate) {
        var candidateDomDataArray = candidate.children;
        candidate.resume = {};
        _.forEach(candidateDomDataArray, function (eachProperty) {
          candidate.resume[eachProperty.attribs.class] = $(eachProperty).text();
        });
        candidate.resume.name = (candidate.resume.app_name.split('-')[0]+'').trim();
        candidate.resume.location = (candidate.resume.app_name.split('-')[1]+'').trim();
        delete candidate.resume['app_name'];

        return candidate.resume;
      });
      console.log('final ',processedResults);
    }
  });
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
