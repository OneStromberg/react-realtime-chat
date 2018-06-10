const url = 'mongodb://mongodb:27017';
const dbName = 'chat';
const MongoClient = require('mongodb').MongoClient;

var db, client;

module.exports = {
  saveMessage: async (email, message) => {
    var { result } = await db.collection('messages').insert({
      email,
      message,
      date: Date.now()
    });
    return result;
  },
  getMessages: (n = 10) => {
    return db.collection('messages').find().sort({_id: -1}).limit(n).toArray();
  },
  getLastUserActivity: (email) => {
    return db.collection('messages').find({"email": email}).sort({_id: -1}).limit(1).toArray();
  },
  init: async () => {
    client = await MongoClient.connect(url);
    db = client.db(dbName);
    db.collection('messages', {
      capped: true,
      size: 50
    });
  }
}