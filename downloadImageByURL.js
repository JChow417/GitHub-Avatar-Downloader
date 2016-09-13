module.exports = function(url, filePath) {
  var request = require("request");
  var fs = require("fs");

  request.get(url).on('response', function(response) {
  //request(url, function(err, response) {
    // this.on('err' , function(err){
    //   if (err) {
    //     throw(err);
    //     return;
    //   }
    // })
    var fileType = response.headers['content-type'].split("/")[1];
    this.pipe(fs.createWriteStream(filePath + "." + fileType));
  });
};