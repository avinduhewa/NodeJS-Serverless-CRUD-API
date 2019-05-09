'use strict';

module.exports.get = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Get Invoked Successfully'
    }),
  };
};

module.exports.getAll = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Get All Invoked Successfully'
    }),
  };
};
