const { Post } = require('../models');
const { JwtHelper } = require('../helpers');

const getPosts = async (author) => {
    let posts = [];
    if (author) {
        posts = await Post.find({ author })
            .sort({ 'created_at': -1 })
            .populate('author');
    } else {
        posts = await Post.find({})
            .sort({ 'created_at': -1 })
            .populate('author');
    }
    return posts;
}

const getPost = async (postId) => {
    const post = await Post.findOne({ _id: postId })
        .populate('author', 'username')
        .populate('comments.author', 'username')
    
    return post;
}

const addPost = async (text, title, accessToken) => {
    try {
        const { id: userId } = JwtHelper.decodeJwt(accessToken);
        const post = new Post({ title, text, author: userId });
        await post.save();
        return { success: true }
    } catch (err) {
        return { err }
    }
}

const updatePost = async (postId, title, text) => {
    try {
        const post = await Post.findOne({ _id: postId });
        post.title = title;
        post.text = text;
        await post.save()
        return { success: true }
    } catch (err) {
        return { err }
    }
}

const deletePost = async (postId) => {
    try {
        const post = await Post.findOne({ _id: postId });
        await post.delete();
        return { success: true }
    } catch (err) {
        return { err }
    }
}

const addCommentToPost = async (accessToken, postId, text) => {
    try {
        const { id: userId } = JwtHelper.decodeJwt(accessToken);

        const post = await Post.findOne({ _id: postId });
        post.comments.push({ text, author: userId, created_at: new Date() })
        await post.save();
        return { success: true }
    } catch (err) {
        return { err }
    }
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
    addCommentToPost
}