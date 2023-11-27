const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    boardData : {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    webURL : {
        type: String,
        required: true,
    },
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;