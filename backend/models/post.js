const mongoose = require('mongoose');
const { post } = require('../app');
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema);