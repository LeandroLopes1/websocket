const connection = require('../models/connection');

const creatMessage = async (message, nickname, timestamp) => {
  const db = await connection();
  const collection = db.collection('messages');
  db.collection('messages').insertOne({ message, nickname, timestamp });
};

const getAll = async () => {
  const db = await connection();
    return db.collection('messages').find().limit(30).toArray();
};

module.exports = { creatMessage, getAll };
