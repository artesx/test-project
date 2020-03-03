import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Spinner from '../spinner';
import { WithApiService } from '../hoc'
import Comments from '../comments';

const Post = ({ match, apiService }) => {

    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true);

    const { id } = match.params;

    const { getPost } = apiService;

    const updatePost = () => {
        getPost(id)
            .then(post => {
                post.comments.reverse()
                setPost(post)
                setLoading(false)
            })
    }

    useEffect(() => {
        updatePost()
    }, [])

    if (loading) {
        return <Spinner />;
    }

    return (
        <Grid>
            <Typography variant="h3">
                {post.title}
            </Typography >
            <hr />
            <Typography variant="h6">
                {post.text}
            </Typography>
            <hr />
            <Typography >
                Author: {post.author ? post.author.username : ''}
            </Typography>
            <Typography >
                Created: {moment(post.created_at).fromNow()}
            </Typography>
            <hr />
            <Typography variant="h5">
                Comments
            </Typography>
            <Comments
                postId={id}
                comments={post.comments}
                updatePost={updatePost}
            />
        </Grid>
    )
}

export default WithApiService()(withRouter(Post));