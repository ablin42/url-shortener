const pe = require("parse-error");

module.exports = {
  promise: async function (promise: Promise<number | string>) {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [pe(err)]);
  },
  checkValidationResult: async function (result: any) {
    let errors: Array<object> = [];
    if (!result.isEmpty()) {
      result.errors.forEach((element: object) => {
        errors.push(element);
      });
    }
    return errors;
  },
};
