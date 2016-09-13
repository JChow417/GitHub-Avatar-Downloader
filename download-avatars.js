var fs = require("fs");
var getRepoContributorAvatars = require('./getRepoContributorAvatars.js');

if(process.argv.length < 4) {
  console.log("Error: Not enough arguments entered");

} else if (!fs.existsSync('.env')) {
  console.log("Error: .env file missing");

} else {
  var repoOwner = process.argv[2];
  var repoName = process.argv[3];
  getRepoContributorAvatars(repoOwner, repoName, function (err, result) {
  //   console.log("Errors:", err);
  //   console.log("Result:", result);
  });
}

