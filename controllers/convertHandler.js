function getUnitAndNumer(input) {
  let numIndex = -1;

  for (let i = input.length - 1; i >= 0; i--) {
    if (isNaN(parseInt(input[i]))) {
      continue;
    }
    numIndex = i;
    break;
  }

  let num = input.slice(0, numIndex + 1);
  let unit = input.slice(numIndex + 1);

  if (num.length == 0) {
    num = 1;
  } else if (num.includes(".") && num.includes("/")) {
    let fractionParts = num.split("/");
    if (
      fractionParts.length == 2 &&
      !isNaN(parseFloat(fractionParts[0])) &&
      !isNaN(parseFloat(fractionParts[1]))
    ) {
      num = parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
    }
  } else if (num.includes(".")) {
    let decimalPart = num.split(".");
    if (
      decimalPart.length == 2 &&
      !isNaN(parseInt(decimalPart[0])) &&
      !isNaN(parseInt(decimalPart[1]))
    ) {
      num = parseFloat(decimalPart);
    }
  } else if (num.includes("/")) {
    let fractionParts = num.split("/");
    if (
      fractionParts.length === 2 &&
      !isNaN(parseInt(fractionParts[0])) &&
      !isNaN(parseInt(fractionParts[1]))
    ) {
      num = parseInt(fractionParts[0]) / parseInt(fractionParts[1]);
    } else {
      console.log("Invalid format: Cannot extract number");
    }
  } else {
    num = parseInt(num);
  }

  return { num, unit };
}

function ConvertHandler() {
  this.getNum = function (input) {
    return getUnitAndNumer(input).num;
  };

  this.getUnit = function (input) {
    return getUnitAndNumer(input).unit;
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

    let resutl;

    if (initUnit == "gal") {
      resutl = initNum * galToL;
    } else if (initUnit == "l") {
      resutl = initNum / galToL;
    } else if (initUnit == "lbs") {
      resutl = initNum * lbsToKg;
    } else if (initUnit == "kg") {
      resutl = initNum / lbsToKg;
    } else if (initUnit == "mi") {
      resutl = initNum * miToKm;
    } else if (initUnit == "km") {
      resutl = initNum / miToKm;
    }

    return Number(resutl).toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
