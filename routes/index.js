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


router.get('/', function(req, res, next) {
  res.render('index.jade');
});

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

router.post('/', function(req, res, next) {
  var substitutions = req.body;
  var tempGitLoc = req.body.loc.split(' ');
  var tempLocationNY =capitalise(req.body.loc);
  console.log(tempLocationNY);
  console.log(tempGitLoc);
  console.log(req.body);
  if(tempLocationNY === "New york"){
    tempLocationNY = "Greater New York City Area";
  }
  substitutions = {
    country: req.body.country,
    location: capitalise(req.body.loc),
    linkedinlocation: tempLocationNY,
    role: 'Developer',
    gitlocation: tempGitLoc.join('+'),
    skill: capitalise(req.body.skill),
    page: 3
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
  dbSvc.searchFromDbSkills().then(function(data) {
    console.log('dbsvc data', data);
    res.status(200).json(_.flatten(data));
  });
});
router.post('/modifyFav', function(req, res, next) {
  console.log('post called');
  dbSvc.updateFavourite(req.body.favourite).then(function(result) {
    console.log('modified');
    res.status(200);
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
      for (var i = 0; i < jsonObj.length; i++) {
        var tempObj = {};
        tempObj.f_name = jsonObj[i]['firstname'];
        tempObj.l_name = jsonObj[i]['lastname'];
        tempObj.skill = jsonObj[i]['skill'];
        tempObj.location = jsonObj[i]['location'];
        tempObj.profile_url = jsonObj[i]['profilelink'];
        tempObj.work_ex = jsonObj[i]['workex'];
        tempObj.image_url = '';
        tempObj.misc_url = '';
        tempObj.location_ui = jsonObj[i]['location'];
        tempObj.search_source = 'external';
        tempObj.misc_details = jsonObj[i]['misc'];
        dbSvc.addToDB(tempObj);
      }
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
