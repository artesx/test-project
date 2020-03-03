import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

import { WithApiService } from '../components/hoc';
import { openNotify } from '../actions';
import PostCrudForm from '../components/post-crud-form';

const CreatePostContainer = (props) => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState({});

    const validate = () => {
        let validate = true;
        let errors = {};
        if (!title) {
            errors = {
                ...errors,
                title: 'Title is required'
            }
            validate = false;
        }
        if (!text) {
            errors = {
                ...errors,
                text: 'Text is required'
            }
            validate = false;
        }
        setError(errors)
        return validate;
    }

    const onSubmit = () => {
        const { apiService: { addPost }, userId } = props;
        if (!validate()) {
            return;
        }
        addPost(userId, title, text)
            .then(data => {
                if (data.success) {
                    props.openNotify({ type: 'success', text: 'Post successfully added' })
                    props.history.push('/personal')
                }
            })
            .catch(err => props.openNotify({ type: 'error', text: err.message }))

    }

    return (
        <Grid container>
            <Grid item xs={3} />
            <Grid item xs={6}>
                <Typography variant="h4">
                    Add post
                </Typography>
                <PostCrudForm
                    error={error}
                    title={title}
                    setTitle={setTitle}
                    text={text}
                    setText={setText}
                    onSubmit={onSubmit}
                />
            </Grid>
            <Grid item xs={3} />
        </Grid>
    )
}

const mapStateToProps = ({ users: { id } }) => {
    return {
        userId: id,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openNotify: (payload) => {
            dispatch(openNotify(payload))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithApiService()(withRouter(CreatePostContainer)));