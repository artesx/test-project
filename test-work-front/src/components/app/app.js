import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import Routes from '../routes';
import Header from '../header';
import Notify from '../notify'

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        if (localStorage.accessToken) {
            this.props.login();
        }
    }

    render() {
        return (
            <Container maxWidth="md">
                <Notify />
                <Header />
                <hr />
                <Routes />
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => {
            dispatch({
                type: 'FETCH_LOGIN_SUCCESS',
                username: localStorage.username,
                id: localStorage.id
            })
        }
    }
};

export default connect(undefined, mapDispatchToProps)(App);