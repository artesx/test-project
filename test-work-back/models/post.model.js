const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    created_at: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [CommentSchema]
});

PostSchema.pre('save', function (next) {
    const date = new Date();
    if (!this._id) {
        this._id = mongoose.mongo.ObjectId();
    }
    if (!this.created_at) {
        this.created_at = date;
    }
    this.updated_at = date;
    next();
});

PostSchema.pre('find', function (next) {
    this.sort({ updated_at: -1 });
    next();
});

module.exports = mongoose.model('Post', PostSchema);