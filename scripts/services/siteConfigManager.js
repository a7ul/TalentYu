var fs = require('fs');
var q = require('q');
var siteConfigManager = function() {

  var getAllConfigs = function() {
    var dir = '../siteConfigs/';
    var data = [];
    var promiseArray = [];
    fs.readdir(dir, function(err, files) {
      if (err) {
        throw err;
      }
      files.forEach(function(file) {
        var defer = q.defer();
        fs.readFile(dir + file, 'utf-8', function(err, jsonFileContent) {
          if (err) {
            defer.reject(err);
            throw err;
          }
          var config = {};
          config[file] = jsonFileContent;
          defer.resolve(config);
        });
        promiseArray.push(defer.promise);
      });
    });
    return q.all(promiseArray);
  };

  return {
    getAllConfigs: getAllConfigs
  };

}();

module.exports = siteConfigManager;
