import React, { useState } from 'react';
import {
    Typography,
    List,
    ListItem,
    Divider,
    ListItemText,
    Grid,
    TextareaAutosize,
    FormControl,
    Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import moment from 'moment';

import { WithApiService } from '../hoc';

const Comments = ({ isLogged, apiService, userId, postId, comments, updatePost }) => {

    const [comment, setComment] = useState("");
    const [error, setError] = useState(false);

    const onSubmit = () => {
        const { addComment } = apiService;

        if (!comment) {
            setError(true);
            return;
        }
        setError(false);

        addComment(postId, comment)
            .then(data => {
                if (data.success) {
                    updatePost()
                    setComment("")
                }
            })

    };

    return (
        <Grid>
            <List>
                {
                    comments ? comments.map(comment => {
                        return (
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={comment.text}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {comment.author.username}
                                            </Typography>
                                            {" - "}{moment(comment.created_at).fromNow()}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        )
                    }) : null
                }
                <Divider variant="inset" component="li" />
            </List>
            {isLogged &&
                <form noValidate autoComplete="off">
                    <FormControl fullWidth>
                        <TextareaAutosize
                            placeholder="Text"
                            aria-label="empty textarea"
                            rowsMin={4}
                            style={{
                                fontSize: "14px",
                                borderColor: error ? "red" : "#666"
                            }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </FormControl>
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={onSubmit}
                    >
                        Add
                    </Button>
                </form>
            }
        </Grid>
    )
};

const mapStateToProps = ({ users: { isLogged, id } }) => {
    return {
        isLogged,
        userId: id
    }
};

export default connect(mapStateToProps)(WithApiService()(Comments));