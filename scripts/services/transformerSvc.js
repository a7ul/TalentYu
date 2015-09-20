var _ = require('lodash');

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
        misc_url: '',
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

  var formatIndeed = function(results) {
    var formatted = _.map(results, function(eachResult) {
      return {
        f_name: ('' + eachResult.name).split(' ')[0],
        l_name: ('' + eachResult.name).split(' ')[1] || '',
        skill: '',
        location: eachResult.location,
        profile_url: eachResult.userlistinfo_link,
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
