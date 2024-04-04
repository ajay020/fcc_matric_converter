"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;
    if (!input) {
      return res.send("Invalid unit");
    }

    let convertHandler = new ConvertHandler();
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);

    if (!initNum || !initUnit || !returnNum || !returnUnit) {
      return res.send("invalid unit");
    }

    let str = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    console.log({ initNum, initUnit });

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: str,
    });
  });
};
