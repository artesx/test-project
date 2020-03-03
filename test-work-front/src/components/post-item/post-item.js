import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const PostItem = ({ _id, title, text, author, created_at, history }) => {

    let substrText = text.slice(0, 200);
    if (substrText.length < text.length) {
        substrText += '...';
    }

    return (
        <Grid item xs={12} sm container style={{ background: '#e0e0e0', marginTop: '25px', padding: '20px' }}>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                        {title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {substrText}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Author: {author.username}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1">{moment(created_at).fromNow()}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push(`/posts/${_id}`)}
                >
                    View post
                </Button>
            </Grid>
        </Grid>
    )
};

export default withRouter(PostItem);