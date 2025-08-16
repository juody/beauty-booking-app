
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
let db;
async function connect() {
  await client.connect();
  db = client.db('beauty');
}
connect();
module.exports = {
  collection: (name) => db.collection(name),
};
