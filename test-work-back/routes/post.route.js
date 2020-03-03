const express = require('express');
const router = express.Router();
const { authMiddleware, postMiddleware } = require('../middlewares');
const { Post } = require('../models');
const { JwtHelper } = require('../helpers');
const { postService } = require('../services');

router.get('/', async (req, res) => {
    const { author } = req.query;
    const posts = await postService.getPosts(author)
    res.json(posts);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const post = await postService.getPost(id)
    res.json(post);
});

router.post('/', authMiddleware.required, async (req, res, next) => {
    const accessToken = req.headers.authorization;
    const { title, text } = req.body;

    const addPost = await postService.addPost(text, title, accessToken);
    if (addPost.success) {
        res.json({ success: true })
    } else {
        next(addPost.err)
    }
});

router.put('/:id', authMiddleware.required, postMiddleware.postUpdateDeleteAccess, async (req, res, next) => {
    const { id: postId } = req.params;
    const { title, text } = req.body;

    const postUpdate = await postService.updatePost(postId, title, text);

    if (postUpdate.success) {
        res.json({ success: true })
    } else {
        next(postUpdate.err)
    }
});

router.delete('/:id', authMiddleware.required, postMiddleware.postUpdateDeleteAccess, async (req, res, next) => {
    const postId = req.params.id;
    const deletePost = await postService.deletePost(postId);

    if (deletePost.success) {
        res.json({ success: true })
    } else {
        next(deletePost.err)
    }
});

router.post('/add-comment', authMiddleware.required, async (req, res) => {
    const { text, postId } = req.body;
    const accessToken = req.headers.authorization;

    const addComment = await postService.addCommentToPost(accessToken, postId, text);

    if (addComment.success) {
        res.json({ success: true })
    } else {
        next(addComment.err)
    }
})

module.exports = router;
