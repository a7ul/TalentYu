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
      curr_stage: '1',
      isFlagged: false,
      isInit: false,
      stageDetails: {}
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

  // var searchFromDbFavourite = function(uid) {
  //   Favourite.find({
  //     uid: uid
  //   }, function(err, favourite) {
  //     if (err) return console.error(err);
  //     return favourite;
  //   });
  // }
  //
  // var searchFromDbCities = function(skill) {
  //   Favourite.find({
  //     skill: skill
  //   }, function(err, favourites) {
  //     if (err) return console.error(err);
  //     var cities = _.uniq(_.pluck(favourites, 'skill'));
  //     return cities;
  //   });
  // }

  var searchFromDbSkills = function() {
    console.log('in search query');
    var dbProm = q.defer();
    Favourite.find({}, function(err, favourites) {
      if (err) return console.log(err);
      dbProm.resolve(favourites);
    });
    return dbProm.promise;
  }

  // var searchFromDbFavourites = function(skill, location) {
  //   Favourite.find({
  //     skill: skill,
  //     location: location
  //   }, function(err, favourites) {
  //     if (err) return console.error(err);
  //     return favourites;
  //   });
  // }
  return {
    addToDB: addToDB,
    searchFromDbSkills: searchFromDbSkills
  }
}

module.exports = dbService;
