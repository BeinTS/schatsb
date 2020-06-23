const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        type: String,
        text: String
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;