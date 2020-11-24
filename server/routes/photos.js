const express = require("express");
const aws = require("aws-sdk");
const router = express.Router();

aws.config.region = "us-east-1";
const S3_BUCKET = process.env.S3_BUCKET;
router.get("/sign-s3", (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const fileBucket = req.query["file-bucket"];
  const s3Params = {
    Bucket: fileBucket,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedReq: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});
module.exports = router;
