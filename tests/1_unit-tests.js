const chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("convertHandler", function () {
  test("should correctly read a whole number input.", function () {
    assert.equal(convertHandler.getNum("12gal"), 12);
    // expect(convertHandler.getNum("12gal")).equal(12);
  });
  test("should correctly read a decimal number input", function () {
    assert.equal(convertHandler.getNum("1.5km"), 1.5);
  });
  test(" should correctly read a fractional input.", function () {
    assert.equal(convertHandler.getNum("1/2km"), 0.5);
  });
  test(" should correctly read a fractional input with a decimal.", function () {
    assert.equal(convertHandler.getNum("3.5/2mi"), 1.75);
  });
  test(" should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
    assert.equal(convertHandler.getNum("1/2/3mi"), undefined);
  });
  test("should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    assert.equal(convertHandler.getNum("km"), 1);
  });

  test("should correctly read each valid input unit.", function () {
    assert.equal(convertHandler.getUnit("2km"), "km");
  });
  test("should correctly return an error for an invalid input unit", function () {
    assert.equal(convertHandler.getUnit("12invalid"), "");
  });

  test("should return the correct return unit for each valid input unit", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });

  test("should correctly return the spelled-out string unit for each valid input unit", function () {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  // convert

  test("should correctly convert gal to L", function () {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1);
  });

  test("should correctly convert L to gal", function () {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.1);
  });

  test("should correctly convert mi to km", function () {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.1);
  });

  test("should correctly convert km to mi", function () {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.1);
  });

  test("should correctly convert lbs to kg", function () {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.1);
  });

  test("should correctly convert kg to lbs", function () {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.1);
  });
});
