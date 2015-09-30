var fs = require('fs');
var q = require('q');
var siteConfigManager = function() {

  var getAllConfigs = function() {
    var dir = __dirname + '/siteConfigs/';
    var data = [];
    var files = fs.readdirSync(dir);
    var promiseArray = [];
    files.forEach(function(file) {
      var defer = q.defer();
      fs.readFile(dir + file, 'utf-8', function(err, jsonFileContent) {
        if (err) {
          defer.reject(err);
          throw err;
        }
        var config = {};
        config[file.split('.')[0]] = JSON.stringify(JSON.parse(jsonFileContent));
        defer.resolve(config);
      });
      promiseArray.push(defer.promise);
    });
    return q.all(promiseArray);
  };

  return {
    getAllConfigs: getAllConfigs
  };

}();

module.exports = siteConfigManager;
