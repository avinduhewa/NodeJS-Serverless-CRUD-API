const dataModel = require('../models/structure');

const regExCheck = (regexString, value) => {
  let regex = new RegExp(regexString);
  let isValid = regex.test(value);
  return isValid;
};

const validate = (data) => {
  let isValid = true;
  for (const propertyL1 in dataModel) {
    if (dataModel[propertyL1] !== null) {
      const elementL1 = dataModel[propertyL1];
      if (!data[propertyL1]) {
        isValid = false;
        break;
      }

      if (elementL1.type !== "objectArray" && elementL1.type !== "elementArray") {
        isValid = regExCheck(elementL1.validation, data[propertyL1]);
      } else if (elementL1.type === "objectArray") {
        data[propertyL1].map((item) => {
          for (const propertyL2 in elementL1.model) {
            if (!item[propertyL2]) {
              isValid = false;
              break;
            }
            if (elementL1.model[propertyL2] !== null) {
              const elementL2 = elementL1.model[propertyL2];
              isValid = regExCheck(elementL2.validation, item[propertyL2]);
            }
          }
        })
      } else if (elementL1.type === "elementArray") {
        data[propertyL1].map((item) => {
          isValid = regExCheck(elementL1.validation, item[propertyL2]);
        })
      }
    }
  }
  return isValid;
};

module.exports = {
  validate
}