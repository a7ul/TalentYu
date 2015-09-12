var express = require('express');

var linkedSvc = function(){

  var urlConstructor = function(skill,role,location){
    var importUrl = "https://api.import.io/store/data/4a4be90f-191c-4a89-a2a1-f988e9226d15/_query?input/webpage/url=";
    var linkedUrl = "https://www.linkedin.com/title/"+skill+"-"+role+"/"+location;
    var finalUrl = importUrl + linkedUrl + "&_user=b9013de3-8bf3-45ed-a811-49397153d1f5&_apikey=b9013de38bf345eda81149397153d1f5cb1f33f50612d6dae3ffc269cf63b328751f4383a26c99b443fd51434fa5a6429db86f09c2f72254e30d29f139a41d873ee2bf7b86751d774ccc321d01a5dfe2"; 
  return finalUrl;
  }

  return{
    searchLinkedIn: function(skill,role,location){
      return urlConstructor(skill,role,location);
    }
  }
}

module.exports = linkedSvc;