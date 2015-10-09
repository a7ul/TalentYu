var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test'); //check link

var Schema = mongoose.Schema;

var favouriteSchema = new Schema({
    uid: String,
    f_name: String,
    l_name: String,
    skill: String,
    location: String,
    profile_url: String,
    work_ex: String,
    image_url: String,
    misc_url:String,
    location_ui: String,
    search_source:String,
    misc_details: String,
    curr_stage: String,
    isFlagged: Boolean,
    isInit: Boolean,
    stage_details: String
});

var Favourite = mongoose.model('Favourite', favouriteSchema);

favouriteSchema.pre('save', function(next) {
    var currentDate = new Date();
    if (!this.creationTime)
        this.creationTime = currentDate;
    next();
});

module.exports = Favourite;
