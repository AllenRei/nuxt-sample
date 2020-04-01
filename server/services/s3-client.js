const AWS = require("aws-sdk");
const { s3 } = require("../config");

const aws = new AWS.S3({
  endpoint: global.config.S3.endpoint,
  accessKeyId: global.config.S3.key,
  secretAccessKey: global.config.S3.secret
});

module.exports = {
  uploadFile(file, name) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: s3.bucket, Key: name, Body: file, ACL: 'public-read' };
      aws.putObject(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};
