var express = require('express');
var router = express.Router();
var request = require('request');
var newGitSvc = require('../scripts/services/gitSearchSvc');
var gitSvc = new newGitSvc();
var newLinkedSvc = require('../scripts/services/linkedSvc');
var linkedSvc = new newLinkedSvc();

/* GET home page. */
router.get('/', function(req, res, next) {
    var reqUrl = gitSvc.searchGit('c++', 'new york', 1);
    console.log(reqUrl);
    request(reqUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body).results);
        }
    });
    var linkedUrl = linkedSvc.searchLinkedIn("javascript", "developer", "delhi");
    request(linkedUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
        }
    });
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;
