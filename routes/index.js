var express = require('express');
var router = express.Router();
var siteConfigManager = require('../scripts/services/siteConfigManagerSvc');
var requestManager = require('../scripts/services/requestManagerSvc');
var _ = require('lodash');

router.get('/', function(req, res, next) {
  res.status(200).send('Port :' + (process.env.PORT || '3000'));
});
router.post('/', function(req, res, next) {
  // var country = req.body.country;
  // var location = req.body.location;
  // var skill = req.body.skill;
  // var role = req.body.role;
  var substitutions = req.body;

  siteConfigManager.getAllConfigs().then(function(allSiteConfigs) {
    requestManager.fetchAllResponses(allSiteConfigs, substitutions).then(function(allSiteResponses) {
      console.log('allSiteResponses', allSiteResponses);
      res.status(200).json(_.flatten(allSiteResponses));
    });
  });

});

module.exports = router;
