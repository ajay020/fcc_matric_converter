function extractNum(input) {
  let units = input.match(/[a-zA-Z]+/);
  if (!units) {
    return "";
  }

  let unit = units[0];
  // Extract the number part
  let numberPart = input.replace(unit, "").trim();

  //   console.log({ numberPart, unit, units });
  let number;

  if (numberPart.length == 0) {
    number = 1;
  } else if (!numberPart.includes(".") && !numberPart.includes("/")) {
    number = parseInt(numberPart);
  } else if (numberPart.includes(".") && numberPart.includes("/")) {
    let fractionParts = numberPart.split("/");
    if (
      fractionParts.length == 2 &&
      !isNaN(parseFloat(fractionParts[0])) &&
      !isNaN(parseFloat(fractionParts[1]))
    ) {
      number = parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
    }
  } else if (numberPart.includes(".")) {
    let decimalPart = numberPart.split(".");
    if (
      decimalPart.length == 2 &&
      !isNaN(parseInt(decimalPart[0])) &&
      !isNaN(parseInt(decimalPart[1]))
    ) {
      number = parseFloat(decimalPart);
    }
  } else if (numberPart.includes("/")) {
    let fractionParts = numberPart.split("/");
    if (
      fractionParts.length === 2 &&
      !isNaN(parseInt(fractionParts[0])) &&
      !isNaN(parseInt(fractionParts[1]))
    ) {
      number = parseInt(fractionParts[0]) / parseInt(fractionParts[1]);
    } else {
      console.log("Invalid format: Cannot extract numberPartber");
    }
  } else {
    number = parseInt(numberPart);
  }
  return number;
}

function ConvertHandler() {
  this.getNum = function (input) {
    return extractNum(input);
  };

  this.getUnit = function (input) {
    let units = input.match(/[a-zA-Z]+/);
    if (!units) {
      return "";
    }

    let initUnit = units[0];
    if (initUnit == "l" || initUnit == "L") {
      initUnit = "L";
    } else {
      initUnit = initUnit.toLowerCase();
    }
    return initUnit;
  };

  this.getReturnUnit = function (initUnit) {
    let units = {
      gal: "L",
      mi: "km",
      lbs: "kg",
      l: "gal",
      km: "mi",
      kg: "lbs",
    };

    return units[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    let fullUnits = {
      gal: "gallons",
      mi: "miles",
      lbs: "pounds",
      l: "liters",
      km: "kilometers",
      kg: "kilograms",
    };

    unit = unit.toLowerCase();

    return fullUnits[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    initUnit = initUnit.toLowerCase();

    let result;

    if (initUnit == "gal") {
      result = initNum * galToL;
    } else if (initUnit == "l") {
      result = initNum / galToL;
    } else if (initUnit == "lbs") {
      result = initNum * lbsToKg;
    } else if (initUnit == "kg") {
      result = initNum / lbsToKg;
    } else if (initUnit == "mi") {
      result = initNum * miToKm;
    } else if (initUnit == "km") {
      result = initNum / miToKm;
    }

    return parseFloat(Number(result).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
