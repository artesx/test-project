import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = (props) => {
    if (!props.isLogged) {
        return <Redirect to="/login" />;
    }
    return (
        <Route {...props}>
            {props.children}
        </Route>
    )
};

const mapStateToProps = ({ users: { isLogged } }) => {
    return {
        isLogged
    }
};

export default connect(mapStateToProps)(ProtectedRoute);