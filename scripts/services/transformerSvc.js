var _ = require('lodash');
var cheerio = require('cheerio');

var transformerSvc = function() {

  var formatLinkedin = function(results) {
    var formatted = {};

    return formatted;
  };

  var formatGithub = function(results) {
    var formatted = _.map(results, function(eachResult) {
      return {
        f_name: ('' + eachResult.userlistinfo_value).split(' ')[0],
        l_name: ('' + eachResult.userlistinfo_value).split(' ')[1] || '',
        skill: '',
        location: eachResult.userlistmeta_value,
        profile_url: eachResult.userlistinfo_link,
        work_ex: '',
        image_url: eachResult.image,
        misc_url: (eachResult['email_link/_text'])?'Email: '+eachResult['email_link/_text']:'',
        search_source: 'Github',
        misc_details: '',
        curr_stage: '',
        stage1_detials: '',
        stage2_details: '',
        stage3_details: ''
      };
    });
    return formatted;
  };

  var formatIndeed = function(body) {
    $ = cheerio.load(body);
    var results = $('.resultsList li .sre-content');
    var processedResults = _.map(results, function(candidate) {
      var candidateDomDataArray = candidate.children;
      candidate.resume = {};
      _.forEach(candidateDomDataArray, function(eachProperty) {
        candidate.resume[eachProperty.attribs.class] = $(eachProperty).text();
        if (eachProperty.attribs.class === 'app_name') {
          candidate.resume.link = 'http://indeed.com' + eachProperty.children[0].attribs.href;
        }
      });
      candidate.resume.name = (candidate.resume.app_name.split('-')[0] + '').trim();
      candidate.resume.location = (candidate.resume.app_name.split('-')[1] + '').trim();
      delete candidate.resume.app_name;
      return candidate.resume;
    });
    var formatted = _.map(processedResults, function(eachResult) {
      return {
        f_name: ('' + eachResult.name).split(' ')[0],
        l_name: ('' + eachResult.name).split(' ')[1] || '',
        skill: '',
        location: eachResult.location,
        profile_url: eachResult.link,
        work_ex: eachResult.experience,
        image_url: eachResult.image,
        misc_url: '',
        search_source: 'Indeed',
        misc_details: 'Education :'+eachResult.education,
        curr_stage: '',
        stage1_detials: '',
        stage2_details: '',
        stage3_details: ''
      };
    });
    return formatted;
  };

  return {
    formatLinkedin: formatLinkedin,
    formatGithub: formatGithub,
    formatIndeed: formatIndeed
  };
}();

module.exports = transformerSvc;
