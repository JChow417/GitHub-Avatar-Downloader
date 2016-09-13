var request = require("request");
var fs = require("fs");
var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var apiRoot = "http://api.github.com";
  //var apiRoot = "https://jchow417:TOKEN@api.github.com";
  var options = {
    url: apiRoot + "/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'download-avators.js',
      //'Authorization': 'token TOKEN'
    },
    json :true
  };
  request(options, function(err, response, body) {
      //console.log(body);
    if (err) {
      console.log(err);
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
  request.get(url, function(err, response) {
    if (err) {
      console.log(err);
      return;
    }
    var fileType = response.headers['content-type'].split("/")[1];
    this.pipe(fs.createWriteStream(filePath + "." + fileType));
  });
};

getRepoContributors(repoOwner, repoName, function (err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
});

