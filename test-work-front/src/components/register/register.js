import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { WithApiService } from '../hoc';
import { login, openNotify } from "../../actions";
import { Typography, TextField, FormControl, Grid, Button } from '@material-ui/core';

const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const validate = () => {
        let validate = true;
        let errors = {};
        if (!username) {
            errors = {
                ...errors,
                username: 'Username is required'
            }
            validate = false;
        }
        if (!password) {
            errors = {
                ...errors,
                password: 'Password is required'
            }
            validate = false;
        }
        setError(errors)
        return validate;
    }


    const onRegister = e => {
        const { apiService: { register } } = props;

        if (validate()) {
            register(username, password)
                .then(response => {

                    if (response.errors && response.errors.message) {
                        props.openNotify({ text: response.errors.message, type: 'error' })
                        return;
                    }

                    props.openNotify({ text: 'Registration completed successfully', type: 'success' })

                    const { user: { username, _id, accessToken, refreshToken } } = response;

                    props.login(username, _id, accessToken, refreshToken);
                });
        }
        e.preventDefault();
    };

    if (props.isLogged) {
        return <Redirect to="/" />
    }

    return (
        <Grid container>
            <Grid item xs={3} />
            <Grid item xs={6}>
                <Typography variant="h4">
                    Sign up
                </Typography>
                <form noValidate autoComplete="off">
                    <FormControl fullWidth>
                        <TextField
                            label="Username"
                            error={!!error.username}
                            id="component-simple"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            helperText={error.username}
                        />

                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <TextField
                            label="Password"
                            error={!!error.password}
                            id="component-helper"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={error.password}
                        />
                    </FormControl>
                    <br />
                    <br />
                    <Button onClick={onRegister} variant="contained" color="primary">
                        Sign up
                    </Button>
                </form>
            </Grid>
            <Grid item xs={3} />
        </Grid>
    )
}

const mapStateToProps = ({ users: { isLogged } }) => {
    return {
        isLogged
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (...rest) => {
            dispatch(login(...rest))
        },
        openNotify: (payload) => {
            dispatch(openNotify(payload))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithApiService()(Register));
