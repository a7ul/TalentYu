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
var q = require('q');
var transformer = require('../scripts/services/transformerSvc');

/* GET home page. */
router.post('/', function(req, res, next) {

  var place = req.body.place;
  var language = req.body.skill;
  
  var gitUrl = gitSvc.searchGit(language, place, 1);
  var linkedUrl = linkedSvc.searchLinkedIn(language, "developer", place);
  var indeedUrl = indeedSvc.searchIndeed(language, "developer", place);
  var finalResponse = getAllCandidates(indeedUrl, linkedUrl, gitUrl);
  finalResponse.then(function(response) {
    res.status(200).json(response);
  });

});

var getAllCandidates = function(indeedUrl, linkedUrl, gitUrl) {
  var indeedDefer = q.defer();
  var gitDefer = q.defer();

  request(indeedUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var indeedUnifiedResults = transformer.formatIndeed(body);
      indeedDefer.resolve(indeedUnifiedResults);
    }
  });
  // request(linkedUrl, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log('Linkedin ',JSON.parse(body));
  //
  //   }
  // });

  request(gitUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var githubUnifiedResults = transformer.formatGithub(JSON.parse(body).results);
      gitDefer.resolve(githubUnifiedResults);
    }
  });
  return q.all([gitDefer.promise, indeedDefer.promise]).then(function(res) {
    var response = {
      'response': _.flatten(res)
    };
    return response;
  });
};


// /* GET home page. */
// router.post('/', function(req, res, next) {
//     console.log(req.body);
//     var loc = req.body.loc;
//     var skill = req.body.skill;
//     var role = req.body.role;
//     var reqUrl = gitSvc.searchGit(skill, loc, 1);
//     console.log(reqUrl);
//     request(reqUrl, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(JSON.parse(body));
//             var gitRes = JSON.parse(body).results;
//             var images = _.pluck(gitRes, 'image');
//             var names = _.pluck(gitRes, 'userlistinfo_value');
//             var gitLinks = _.pluck(gitRes,'userlistinfo_link/_source');
//             var locations = _.pluck(gitRes,'userlistmeta_value');
//             var emails = _.pluck(gitRes,'email_link/_text');
//             var resultJSON = [];
//             for(var i=0;i<gitRes.length;i++){
//               var tempObj = {};
//               tempObj.userName = names[i];
//               tempObj.image = images[i];
//               tempObj.userLocation = locations[i];
//               tempObj.gitLink = gitLinks[i];
//               tempObj.email = emails[i];
//               resultJSON.push(tempObj);
//               console.log(tempObj);
//             }
//             console.log(resultJSON);
//             res.send({ ans42: resultJSON });
//         } else
//             console.log(error);
//     });
//
// });

module.exports = router;
