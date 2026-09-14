const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let clientPromise;

if (!clientPromise) {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

module.exports = clientPromise;
