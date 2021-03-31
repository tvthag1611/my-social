const { uploadFile } = require("../middleware");
const fs = require("fs");
const baseUrl = "http://localhost:8080/uploads/";

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.send({ status: 400, message: "Please upload a file!" });
    }

    res.send({
      status: 200,
      message: "Uploaded the file successfully: " + req.file?.originalname,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/public/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.send({
        status: 500,
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.send({ status: 200, fileInfos });
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.send({
        status: 500,
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
