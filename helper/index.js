const makeResponse = require('./makeResponse');
const db = require('./mongodb');
const validator = require('./validation');

module.exports.makeResponse = makeResponse;
module.exports.db = db;
module.exports.validator = validator;