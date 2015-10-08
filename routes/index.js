var express = require('express');
var router = express.Router();
var siteConfigManager = require('../scripts/services/siteConfigManagerSvc');
var requestManager = require('../scripts/services/requestManagerSvc');
var _ = require('lodash');
var q = require('q');
var newDbSvc = require('../scripts/services/dbService');
var dbSvc = new newDbSvc();
var fs = require('fs');
var Converter = require('csvtojson').Converter;
var multer = require('multer');
var upload = multer({
    dest: './uploads/'
});

var param = {};



router.post('/', function(req, res, next) {
  var substitutions = req.body;
  console.log(req.body);
  substitutions = {
    country: req.body.country,
    location: req.body.loc,
    role: 'Developer',
    skill: req.body.skill,
    page: 1
  };
  siteConfigManager.getAllConfigs().then(function(allSiteConfigs) {
    requestManager.fetchAllResponses(allSiteConfigs, substitutions).then(function(allSiteResponses) {
      console.log('allSiteResponses', allSiteResponses);
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
    console.log('dbsvc data',data);
    res.status(200).json(_.flatten(data));
  });
});
router.post('/modifyFav', function(req, res, next) {
  dbSvc.updateFavData(req.body).then(function(result) {
    return res;
  }).fail(function(error) {
    return res;
  });
});
router.post('/uploadCSV', upload.single('CSV'), function(req, res) {
    var tempPath = req.file.path;
    var targetPath = 'uploads/' + req.file.originalname;
    console.log(req.file);
    var src = fs.createReadStream(tempPath);
    var dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
    src.on('end', function() {
        fs.unlink(tempPath);
        var fileStream = fs.createReadStream("./uploads/" + req.file.originalname);
        console.log('converting');
        var converter = new Converter(param);
        fileStream.pipe(converter);
        converter.on("end_parsed", function(jsonObj) {
            console.log('coverted:' + jsonObj);
            googleSvc.setLocations(jsonObj);
            res.render('uploadSuccess');
            fileStream.destroy();
            res.end();
        });
    });
    src.on('error', function(err) {
        res.end('error');
    });
});

module.exports = router;
