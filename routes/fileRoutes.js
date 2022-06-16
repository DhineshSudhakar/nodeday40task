const express = require("express");
const router = express.Router();
const fs = require("fs");


const currentPathString = __dirname.split("\\")
const currentDirname = currentPathString.slice(0, currentPathString.length-1).join("\\")

router.post("/create", (req, res) => {
  const folderName = req.body.folderName;
  const timeStamp = new Date();
  const dateString = timeStamp.toString().split(" ");
  const dateMonth = `${dateString[2]}${dateString[1]}`;
  const fileName = `${dateMonth}-${timeStamp.getHours()}-${timeStamp.getMinutes()}.txt`;
  const folderAddress = `${currentDirname}/${folderName}/${fileName}`;

  if (!fs.existsSync(`${currentDirname}/${folderName}`)) {
    fs.mkdirSync(`${currentDirname}/${folderName}`);
  }

  try {
    fs.writeFileSync(folderAddress, timeStamp.toString());
    res.send({ msg: "File created successfully" });
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

router.get("/retrive", (req, res) => {
  const { folderName } = req.body;
  if (fs.existsSync(`${currentDirname}/${folderName}`)) {
    fs.readdir(`${currentDirname}/${folderName}`, (err, files) => {
      if (err) {
        res.status(400).send({ msg: err.message });
      }

      files.forEach((file) => {
        console.log(file);
      });
    });
    res.send({ msg: "Retrive files successfull" });
  }
});

module.exports = router
