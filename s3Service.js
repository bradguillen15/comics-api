const AWS = require('aws-sdk');

const s3Service = () => {
  AWS.config.credentials = new AWS.TemporaryCredentials();
  new AWS.S3().listBucket((err, data) => {
    if (err) throw new Error(err);
    console.log(data);
  });

  return {

  };
};

module.exports = s3Service();
