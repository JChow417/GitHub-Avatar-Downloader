module.exports  = function(repoOwner, repoName, cb) {
  var request = require("request");
  var fs = require("fs");
  var downloadImageByURL = require('./downloadImageByURL.js');
  var apiToken = getApiToken();

  var apiRoot = "http://api.github.com";
  //var apiRoot = "https://jchow417:' + apiToken + '@api.github.com";
  var options = {
    url: apiRoot + "/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'download-avators.js',
      'Authorization': 'token ' + apiToken,
    },
    json :true
  };

  request(options, function(err, response, body) {
    //console.log(body);
    if (err) {
      console.log(err);
      return;

    } else if (body.message === 'Not Found') {
      console.log('Error: Non-existing owner/repo provided');
      return;

    } else if (body.message === 'Bad credentials') {
      console.log('Error: Bad credentials in .env');
      return;

    }
      var dir = './avatar';
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
      }

      for(contributors in body) {
        var url = body[contributors]['avatar_url'];
        var login = body[contributors]['login']
        downloadImageByURL(url, dir + "/" +  login);
      }
  });
}

function getApiToken() {
  require('dotenv').config();
  var apiToken = process.env['GITHUB_API_TOKEN'];
  return apiToken;
}
