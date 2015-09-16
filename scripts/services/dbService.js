var User = require('/scripts/models/candidateModel');
var randomstring = require("randomstring");
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');

var dbService = function() {

    var addToDB = function(favourite) {
        var UID: randomstring.generate() {
            length: 10,
            charset: 'Alphabetic'
        }
        var favourite = Favourite({
            uid: UID,
            f_name: favourite.f_name,
            l_name: favourite.l_name,
            skill: favourite.skill,
            location: favourite.location,
            profile_url: favourite.profile_url,
            work_ex: favourite.work_ex,
            image_url: favourite.image_url,
            misc_url: favourite.misc_url,
            search_source: favourite.search_source,
            misc_details: favourite.misc_details,
            curr_stage: 1,
            stage1_details: '',
            stage2_details: '',
            stage3_details: ''
        });

        favourite.save(function(err) {
            if (err) throw err;
            console.log('User created!');
        });
    }

    var searchFromDbFavourite = function(uid) {
        User.find({
            uid: uid
        }, function(err, favourite) {
            if (err) return console.error(err);
            return favourite;
        });
    }

    var searchFromDbCities = function(skill) {
        User.find({
            skill: skill
        }, function(err, favourites) {
            if (err) return console.error(err);
            var cities = _.uniq(_.pluck(favourites, 'skill'));
            return cities;
        });
    }

    var searchFromDbSkills = function() {
        User.find({}, function(err, favourites) {
            if (err) return console.error(err);
            var skills = _.uniq(_.pluck(favourites, 'location'));
            return skills;
        });
    }

    var searchFromDbFavourites = function(skill, location) {
        User.find({
            skill: skill,
            location: location
        }, function(err, favourites) {
            if (err) return console.error(err);
            return favourites;
        });
    }
    return {
        addToDb: addToDb,
        searchFromDb: searchFromDb
    }
}

module.exports = dbService;