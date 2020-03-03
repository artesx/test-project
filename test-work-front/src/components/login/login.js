import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography, TextField, FormControl, Grid, Button } from '@material-ui/core';

import { login, openNotify } from '../../actions';
import { WithApiService } from '../hoc';

const Login = (props) => {

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

    const onLogin = e => {
        const { apiService: { login } } = props;
        if (validate()) {
            login(username, password)
                .then(response => {
                    if (response.errors && response.errors.message) {
                        if (response.errors.message) {
                            props.openNotify({ type: 'error', text: response.errors.message })
                        }
                        return;
                    }

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
                    Sign in
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
                    <Button onClick={onLogin} variant="contained" color="primary">
                        Sign in
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

export default connect(mapStateToProps, mapDispatchToProps)(WithApiService()(Login));
