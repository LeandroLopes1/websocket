const messageModel = require('../models/userModel');

const createMessage = async (message, nickname, timestamp) => {
  await messageModel.creatMessage(message, nickname, timestamp);
};

const getAll = async () => messageModel.getAll();

module.exports = { createMessage, getAll };
