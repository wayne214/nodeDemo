const MongoClient = require('mongodb').MongoClient;
const settings = require('../settings');
const mongoConfig = settings.mongoConfig;

let fullMongoUrl = `${mongoConfig.serverUrl}`;
let _db = undefined;

let connectDb = async () => {
    const client = new MongoClient(fullMongoUrl);
    if (!_db) {
        await client.connect();
        _db = client.db(mongoConfig.database);
    }

    return _db;
};

module.exports = connectDb;