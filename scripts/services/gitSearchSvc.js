var express = require('express');


var gitSearchSvc = function() {

    var urlConstructor = function(skill, location, page) {

        var importUrl = "https://api.import.io/store/data/ff1408c6-c033-418b-9229-5447a6adc01d/_query?input/webpage/url=";
        var gitUrl = "https://github.com/search?l=" + skill + "&p=" + page + "&q=location:" + location + "&ref=searchresults&type=Users&utf8=✓";
        var finalUrl = importUrl + encodeURIComponent(gitUrl) + "&_user=b9013de3-8bf3-45ed-a811-49397153d1f5&_apikey=b9013de38bf345eda81149397153d1f5cb1f33f50612d6dae3ffc269cf63b328751f4383a26c99b443fd51434fa5a6429db86f09c2f72254e30d29f139a41d873ee2bf7b86751d774ccc321d01a5dfe2";
        return finalUrl;
    }

    return {
        searchGit: function(skill, location, page) {
            var reqUrl = urlConstructor(skill, location, page);
            return reqUrl;
        }
    }
}

module.exports = gitSearchSvc;