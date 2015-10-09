var randomstring = require("randomstring");
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var q = require('q');
var Favourite = require('../../scripts/models/candidateModel');

var dbService = function() {

  var addToDB = function(favourite) {
    var UID = randomstring.generate({
      length: 10,
      charset: 'Alphabetic'
    });
    console.log('IN ADD');

    var favouriteCandidate = Favourite({
      uid: UID,
      f_name: favourite.f_name,
      l_name: favourite.l_name,
      skill: favourite.skill,
      location: favourite.location,
      profile_url: favourite.profile_url,
      work_ex: favourite.work_ex,
      image_url: favourite.image_url,
      misc_url: favourite.misc_url,
      location_ui: favourite.location_ui,
      search_source: favourite.search_source,
      misc_details: favourite.misc_details,
      curr_stage: favourite.curr_stage,
      isFlagged: false,
      isInit: favourite.isInit,
      stage_details: favourite.stage_details
    });
    console.log(favouriteCandidate);
    favouriteCandidate.save(function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log('User created!');
    });
  }
  var searchFromDbSkills = function() {
    console.log('in search query');
    var dbProm = q.defer();
    Favourite.find({}, function(err, favourites) {
      if (err) return console.log(err);
      dbProm.resolve(favourites);
    });
    return dbProm.promise;
  }

  var updateFavourite = function(favourite) {
    var dbProm1 = q.defer();
    console.log('in update fav');
    console.log(favourite);
    Favourite.findOneAndUpdate({
      uid: favourite.uid
    }, {
      stage_details: favourite.stage_details,
      isInit: favourite.isInit,
      curr_stage: favourite.curr_stage
    }, function(err, favourite) {
      if (err) throw err;
      dbProm1.resolve(favourite);
    });
      return dbProm1.promise;
  }

  return {
    addToDB: addToDB,
    searchFromDbSkills: searchFromDbSkills,
    updateFavourite: updateFavourite
  }
}

module.exports = dbService;
