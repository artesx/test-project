import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';

import { WithApiService } from '../hoc';
import { openNotify } from '../../actions';
import { IconButton } from '@material-ui/core';

import {
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    Grid,
    Button,
    TableCell,
    TableContainer,
    TableRow
} from '@material-ui/core';

const Personal = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const { apiService: { getPosts }, userId } = props;
        getPosts(userId)
            .then(posts => {
                setPosts(posts);
            })
    }, [])

    const deletePost = id => {
        if (!window.confirm("Sure you want to delete the post")) {
            return;
        }
        const { apiService: { deletePost } } = props;
        deletePost(id)
            .then(data => {
                if (data.success) {
                    props.openNotify({ type: "success", text: "Post succefully deleted" });
                    const updatedPosts = posts.filter(item => item._id !== id);
                    setPosts(updatedPosts);
                }
            })
    }

    return (
        <Grid container>
            <Typography variant="h4">Personal page</Typography>
            <Grid container style={{ marginTop: "25px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddIcon>Add post</AddIcon>}
                    style={{ marginBottom: "20px" }}
                    onClick={() => props.history.push("/create-post")}
                >
                    Add post
                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Created</TableCell>
                                <TableCell align="right">Updated</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map(({ _id, title, created_at, updated_at }) => (
                                <TableRow key={_id}>
                                    <TableCell component="th" scope="row">
                                        {title}
                                    </TableCell>
                                    <TableCell align="right">{created_at}</TableCell>
                                    <TableCell align="right">{updated_at}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            aria-label="delete"
                                            onClick={() => props.history.push(`/update-post/${_id}`)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            aria-label="delete"
                                            onClick={() => deletePost(_id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
};

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

export default connect(mapStateToProps, mapDispatchToProps)(WithApiService()(withRouter(Personal)));