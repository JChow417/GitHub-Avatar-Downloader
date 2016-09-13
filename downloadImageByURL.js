module.exports = function(url, filePath) {
  var request = require("request");
  var fs = require("fs");

  request.get(url).on('response', function(response) {

    var fileType = response.headers['content-type'].split("/")[1];
    this.pipe(fs.createWriteStream(filePath + "." + fileType));
  });
};