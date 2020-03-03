import React, { useState, useEffect } from 'react';
import PostItem from "../post-item";
import { WithApiService } from '../hoc';
import { List, Typography } from '@material-ui/core';
import Spinner from '../spinner';

const Posts = (props) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { apiService: { getPosts } } = props;
        getPosts()
            .then(posts => {
                setPosts(posts);
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <Typography variant="h4">Posts</Typography>
            <List component="nav" aria-label="main mailbox folders">
                {
                    posts.map((post) => {
                        return (
                            <PostItem
                                key={post._id}
                                {...post}
                            />
                        )
                    })
                }
            </List>
        </div>
    )
};

export default WithApiService()(Posts);