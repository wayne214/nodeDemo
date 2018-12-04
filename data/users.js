const mongoCollections = require("../config/mongoCollections");
const genericData = require("./generic");

// define custom CRUD functions...
const collectionRef = mongoCollections.users;

const genericUsers = genericData(collectionRef);

module.exports = genericUsers;