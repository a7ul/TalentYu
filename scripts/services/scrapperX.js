var cheerio = require('cheerio');
var _ = require('lodash');
//=============================
//Sample Config for reference
//=============================
// var config = {
//   repeatItemGroup: 'li.sre',
//   dataFormat: {
//     name: {
//       selector: '.app_link',
//       type: 'text'
//     },
//     link: {
//       selector: '.app_link',
//       type: 'attr:href'
//     },
//     location: {
//       selector: '.location',
//       type: 'text'
//     }
//   }
// };

var scrapperX = function() {

  var getValueFromNode = function(jQueryElement, type) {
    if (type === 'text') {
      return jQueryElement.text();
    } else if (type.search('attr') !== -1) {
      var attribute = type.split(':')[1];
      return jQueryElement.attr(attribute);
    }
  };

  var scrape = function(body, config) {
    $ = cheerio.load(body);
    var scrappedObject = [];
    var repeatItemGroupList = $(config.repeatItemGroup);
    _.forEach(repeatItemGroupList, function(eachRepeatItem) {
      var allConfigDataKeys = Object.keys(config.dataFormat);
      var scrappedItem = {};
      _.forEach(allConfigDataKeys, function(eachKey) {
        if (typeof config.dataFormat[eachKey] === 'object') {
          var selector = config.dataFormat[eachKey].selector;
          var type = config.dataFormat[eachKey].type;
          scrappedItem[eachKey] = getValueFromNode($(eachRepeatItem).find(selector), type);
        } else {
          scrappedItem[eachKey] = config.dataFormat[eachKey];
        }

      });
      scrappedObject.push(scrappedItem);
    });
    return scrappedObject;
  };

  return {
    scrape: scrape
  };
}();

module.exports = scrapperX;
