var express = require('express');

var linkedSvc = function() {

  var urlConstructor = function(skill, role, location) {
    var linkedUrl = "https://www.linkedin.com/title/" + skill + "-" + role + "/" + location;
    return linkedUrl;
  };

  return {
    searchLinkedIn: function(skill, role, location) {
      return urlConstructor(skill, role, location);
    }
  };
};

module.exports = linkedSvc;
