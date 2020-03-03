const { Post } = require('../models');
const { JwtHelper } = require('../helpers');

const postUpdateDeleteAccess = async (req, res, next) => {
    const accessToken = req.headers.authorization;
    const postId = req.params.id;
    const userId = JwtHelper.decodeJwt(accessToken).id;

    const post = await Post.findOne({ _id: postId });

    if (String(post.author) !== String(userId)) {
        return res.status(401).json({
            errors: { 'post': 'Access denied!' }
        })
    }

    next()
}

module.exports = {
    postUpdateDeleteAccess
}