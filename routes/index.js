var express = require('express');
var router = express.Router();
var request = require('request');
var newGitSvc = require('../scripts/services/gitSearchSvc');
var gitSvc = new newGitSvc();
var newLinkedSvc = require('../scripts/services/linkedSvc');
var linkedSvc = new newLinkedSvc();
var _ = require('lodash');

var q = require('q');

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var loc = req.body.loc;
    var skill = req.body.skill;
    var role = req.body.role;
    var reqUrl = gitSvc.searchGit(skill, loc, 1);
    console.log(reqUrl);
    request(reqUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
            var gitRes = JSON.parse(body).results;
            var images = _.pluck(gitRes, 'image');
            var names = _.pluck(gitRes, 'userlistinfo_value');
            var gitLinks = _.pluck(gitRes,'userlistinfo_link/_source');
            var locations = _.pluck(gitRes,'userlistmeta_value');
            var emails = _.pluck(gitRes,'email_link/_text');
            var resultJSON = [];
            for(var i=0;i<gitRes.length;i++){
              var tempObj = {};
              tempObj.userName = names[i];
              tempObj.image = images[i];
              tempObj.userLocation = locations[i];
              tempObj.gitLink = gitLinks[i];
              tempObj.email = emails[i];
              resultJSON.push(tempObj);
              console.log(tempObj);
            };
            console.log(resultJSON);
            res.send({ ans42: resultJSON });
        } else
            console.log(error);
    });
    // var linkedUrl = linkedSvc.searchLinkedIn(skill, role, loc);
    // request(linkedUrl, function(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(JSON.parse(body));
    //     } else
    //         console.log(error);
    // });
});

module.exports = router;