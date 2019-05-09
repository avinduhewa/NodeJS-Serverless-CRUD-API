'use strict';
const util = require('../../shared/index');
const async = require('async');

let shared = {}; // commonly shared data object

const updateFromDatabase = (callback) => {
  shared.db.collection(util.db.collectionName)
    .findOneAndUpdate(
      { id: shared.body.id },
      { $set: shared.body }
    )
    .then(response => {
      callback(null, response);
    })
}

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // stop function execution when callback is called
  if (event.source === 'aws.events') callback(null, util.makeResponse({}, 200)); // handle schedule events

  shared.body = JSON.parse(event.body);

  util.db.dbConnect((err, db) => {
    if (err) return callback(err);
    shared.db = db; // enable db object to be access by the decoupled functions

    async.series([
      updateFromDatabase,
    ], (err, results) => {
      if (err) return callback(err);

      const response = util.makeResponse(200, results);
      return callback(null, response);
    });
  })
};
