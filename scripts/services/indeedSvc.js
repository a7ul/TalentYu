var express = require('express');

var linkedSvc = function () {

  var urlConstructor = function (skill, role, location) {
    var linkedUrl = "http://www.indeed.com/resumes/" + skill + "-" + role + "/" + "in-Bengaluru-Karnataka";
    var finalUrl = linkedUrl;
    return finalUrl;
  };

  return {
    searchIndeed: function (skill, role, location) {
      return urlConstructor(skill, role, location);
    }
  };
};

module.exports = linkedSvc;
