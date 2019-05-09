'use strict';
const util = require('../../shared/index');
const async = require('async');

let shared = {}; // commonly shared data object

const getItemFromDatabase = (callback) => {
  shared.db.collection(util.db.collectionName)
    .findOne({ id: shared.pathParams.id })
    .then(response => {
      callback(null, response);
    })
}

const getAllItemsFromDatabase = (callback) => {
  shared.db.collection(util.db.collectionName)
    .find({})
    .toArray()
    .then(response => {
      callback(null, response);
    })
}

module.exports.get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // stop function execution when callback is called
  if (event.source === 'aws.events') callback(null, util.makeResponse({}, 200)); // handle schedule events

  // make function parameters accessible to decoupled functions
  shared.pathParams = event.pathParameters;

  util.db.dbConnect((err, db) => {
    if (err) return callback(err);
    shared.db = db; // enable db object to be access by the decoupled functions

    async.series([
      getItemFromDatabase,
    ], (err, results) => {
      if (err) return callback(err);

      const response = util.makeResponse(200, results);
      return callback(null, response);
    });

  })
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; // stop function execution when callback is called
  if (event.source === 'aws.events') callback(null, util.makeResponse({}, 200)); // handle schedule events

  util.db.dbConnect((err, db) => {
    if (err) return callback(err);
    shared.db = db; // enable db object to be access by the decoupled functions

    async.series([
      getAllItemsFromDatabase,
    ], (err, results) => {
      if (err) return callback(err);

      const response = util.makeResponse(200, results);
      return callback(null, response);
    });

  })
};
