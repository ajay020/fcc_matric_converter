"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;

    console.log({ input });

    if (!input) {
      return res.status(200).send("invalid unit");
    }

    let convertHandler = new ConvertHandler();
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);

    // console.log({ initNum, initUnit, returnNum, returnUnit });

    if (!initNum && !returnUnit) {
      console.log("INVALID NUM AND UNIT", {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
      });

      return res.status(200).send("invalid number and unit");
    }

    if (!initNum) {
      console.log("INVALID INIT NUm", {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
      });

      return res.status(200).send("invalid number");
    }

    if (!initUnit || !returnUnit) {
      console.log("INVALID INIT UNIT", {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
      });

      return res.send("invalid unit");
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
