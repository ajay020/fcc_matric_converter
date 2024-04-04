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

    console.log(initNum, initUnit);

    if (!initNum) {
      return res.send("invalid number");
    }

    if (!initUnit || !returnUnit) {
      return res.send("invalid unit");
    }

    if (!initNum && !initUnit && !returnUnit) {
      return res.send("invalid number and unit");
    }

    let str = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: str,
    });
  });
};
