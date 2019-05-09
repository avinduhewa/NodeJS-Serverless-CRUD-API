'use strict';

module.exports.update = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Update Invoked Successfully'
    }),
  };
};
