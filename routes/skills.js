const { TemplateBuilder, getResponseModel } = require("../models/response.js");
const { getColleges, getDepartments, getMajors } = require("../services/skills.js");

var express = require("express");
var router = express.Router();

/* GET response test */
router.get("/", function(req, res) {
  res.send("respond success");
});

router.post("/buttons", function(req, res) {
  const template = new TemplateBuilder()
    .simpleText("안녕 난 냥냥봇이야")
    .build();

  res.status(200).send(getResponseModel(template));
});

router.post("/colleges", async (req, res) => {
  const findData = await getColleges();
  const colleages = findData.map(data => data.name);

  const templateBuilder = new TemplateBuilder().simpleText(
    "단과대학 목록이라냥"
  );

  colleages.forEach(colleage => {
    templateBuilder.setQuickReplies(
      colleage,
      "block",
      colleage,
      "5e2ecfcc92690d0001fc676d",
      null
    );
  });
  const template = templateBuilder.build();
  res.status(200).send(getResponseModel(template));
});

router.post("/departments", async (req, res) => {
  const { userRequest } = req.body;
  const colleageName = userRequest.utterance;
  const findData = await getDepartments(colleageName);
  const departments = findData.map(data => data.name);

  const templateBuilder = new TemplateBuilder().simpleText(
    `${colleageName} 아래의 학부들이라냥`
  );

  departments.forEach(department => {
    templateBuilder.setQuickReplies(
      department,
      "block",
      department,
      "5e358c38b617ea0001306996",
      null
    );
  });
  const template = templateBuilder.build();
  res.status(200).send(getResponseModel(template));

});


router.post("/majors", async (req, res) => {
  const { userRequest } = req.body;
  const depName = userRequest.utterance;
  const findData = await getMajors(depName);
  const majors = findData.map(data => data.name);

  const templateBuilder = new TemplateBuilder().simpleText(
    `${depName} 아래의 학과들이라냥`
  );

  majors.forEach(major => {
    templateBuilder.setQuickReplies(
      major,
      "block",
      major,
      "5e3591ba8192ac0001953528",
      null
    );
  });
  const template = templateBuilder.build();
  res.status(200).send(getResponseModel(template));
});

router.post("/info/major", async (req, res) => {
  const { userRequest } = req.body;
  const majorName = userRequest.utterance;
  console.log(majorName);
  const templateBuilder = new TemplateBuilder().simpleText(
    `${majorName} 이라냥`
  );

  const template = templateBuilder.build();
  res.status(200).send(getResponseModel(template));
});



module.exports = router;
