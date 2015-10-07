var express = require('express');
var router = express.Router();
var siteConfigManager = require('../scripts/services/siteConfigManagerSvc');
var requestManager = require('../scripts/services/requestManagerSvc');
var _ = require('lodash');
var q = require('q');
var newDbSvc = require('../scripts/services/dbService');
var dbSvc = new newDbSvc();



router.post('/', function(req, res, next) {
  var substitutions = req.body;
  console.log(req.body);
  substitutions = {
    country: 'in',
    location: req.body.loc,
    role: 'role',
    skill: 'Javascript',
    page: 1
  };
  siteConfigManager.getAllConfigs().then(function(allSiteConfigs) {
    requestManager.fetchAllResponses(allSiteConfigs, substitutions).then(function(allSiteResponses) {
      //console.log('allSiteResponses', allSiteResponses);
      res.status(200).json(_.flatten(allSiteResponses));
    });
  });
});
router.post('/addToFav', function(req, res, next) {
  console.log(req.body.favourite);
  dbSvc.addToDB(req.body.favourite);
  res.send('Added');
});
router.get('/getFavData', function(req, res, next) {
  console.log('in fav data');
  dbSvc.searchFromDbSkills().then(function(data){
    return data;
  });
});
router.post('/modifyFav', function(req, res, next) {
  dbSvc.updateFavData(req.body).then(function(result) {
    return res;
  }).fail(function(error) {
    return res;
  });
});

module.exports = router;
