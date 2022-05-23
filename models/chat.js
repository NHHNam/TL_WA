const mongoose = require('mongoose')

const newChat = new mongoose.Schema({
    name: String,
    message: String
})

const Chat = mongoose.model('Chats', newChat)
module.exports = Chat