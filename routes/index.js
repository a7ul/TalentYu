var express = require('express');
var router = express.Router();
var request = require('request');
var q = require('q');
var siteConfigManager = require('../scripts/services/siteConfigManagerSvc');
var requestManager = require('../scripts/services/requestManagerSvc');
var _ = require('lodash');

/* GET home page. */
router.post('/', function(req, res, next) {
  // var country = req.body.country;
  // var location = req.body.location;
  // var skill = req.body.skill;
  // var role = req.body.role;
  var substitutions = req.body;

  siteConfigManager.getAllConfigs().then(function(allSiteConfigs) {
    requestManager.fetchAllResponses(allSiteConfigs,substitutions).then(function(allSiteResponses) {
      console.log('allSiteResponses', allSiteResponses);
      res.status(200).json(_.flatten(allSiteResponses));
    });
  });






  // var gitUrl = gitSvc.searchGit(language, place, 1);
  // var linkedUrl = linkedSvc.searchLinkedIn(language, "developer", place);
  // var indeedUrl = indeedSvc.searchIndeed(language, "developer", place);
  // var finalResponse = getAllCandidates(indeedUrl, linkedUrl, gitUrl);
  // finalResponse.then(function(response) {
  //   res.status(200).json(response);
  // });

});

// var getAllCandidates = function(indeedUrl, linkedUrl, gitUrl) {
//   var indeedDefer = q.defer();
//   var gitDefer = q.defer();
//   var linkedinDefer = q.defer();
//
//   request(indeedUrl, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var indeedUnifiedResults = transformer.formatIndeed(body);
//       indeedDefer.resolve(indeedUnifiedResults);
//     }
//   });
//
//   request(linkedUrl, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var linkedinUnifiedResults = transformer.formatLinkedin(body);
//       linkedinDefer.resolve(linkedinUnifiedResults);
//     }
//   });
//
//   request(gitUrl, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var githubUnifiedResults = transformer.formatGithub(JSON.parse(body).results);
//       gitDefer.resolve(githubUnifiedResults);
//     }
//   });
//   return q.all([gitDefer.promise,linkedinDefer.promise,indeedDefer.promise]).then(function(res) {
//     var response = {
//       'response': _.flatten(res)
//     };
//     return response;
//   });
// };



module.exports = router;
