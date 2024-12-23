const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    liked: {
        type: Object,
        default: {}
    }
});

module.exports = mongoose.model("playlist", playlistSchema);

