const mongo = require('mongodb')

const mongoClient = mongo.MongoClient

const dbUrl = process.env.db_url
const dbName = process.env.db_name

const dbConnect = (cb) => {
  mongoClient.connect(dbUrl, (err, database) => {
    if (err) {
      console.error("An error occured while connecting to the database", { err });
      return cb(err, null);
    } else {
      console.info({ message: 'sucessfully connected to the database' })
      return cb(null, database.db(dbName));
    }
  });
}

module.exports = {
  dbConnect,
  objectId: mongo.ObjectID,
};
