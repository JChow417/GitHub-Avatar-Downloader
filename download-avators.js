var request = require("request");
var fs = require("fs");

var apiToken = "";
if (!fs.existsSync('.env')) {
  console.log("Error: .env file missing, no API token used");
} else {
  //console.log('YES ENV');
  require('dotenv').config();
  var apiToken = process.env['GITHUB_API_TOKEN'];
  if(apiToken === undefined) {
    console.log("Error: Incorrect credentials in .env file, no API token used");
  }
}

function getRepoContributors(repoOwner, repoName, cb) {
  var apiRoot = "http://api.github.com";
  //var apiRoot = "https://jchow417:TOKEN@api.github.com";
  var options = {
    url: apiRoot + "/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'download-avators.js',
      //'Authorization': 'token ' + apiToken,
    },
    json :true
  };

  request(options, function(err, response, body) {
    //console.log(body);
    if (err) {
      throw(err);
      return;
    } else if (body.message === 'Not Found') {
      console.log('Error: Non-existing owner/repo provided');
      return;
    }

      var dir = './avatar';
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }

      for(contributors in body) {
        var url = body[contributors]['avatar_url'];
        var login = body[contributors]['login']
        downloadImageByURL(url, dir + "/" +  login);
      }

  });
}

function downloadImageByURL(url, filePath) {
  request.get(url).on('response', function(response) {
  //request(url, function(err, response) {

    // if (err) {
    //   console.log(err);
    //   return;
    // }
    var fileType = response.headers['content-type'].split("/")[1];
    //this.pipe(fs.createWriteStream(filePath + "." + fileType));
  });
};

if(process.argv.length < 4) {
  console.log("Error: Not enough arguments entered");
} else {
  var repoOwner = process.argv[2];
  var repoName = process.argv[3];
  getRepoContributors(repoOwner, repoName, function (err, result) {
  //   console.log("Errors:", err);
  //   console.log("Result:", result);
  });

}

