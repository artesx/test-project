import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

const IsLoggedLinks = ({ username, logout }) => {
    return (
        <List component="nav" style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
        }} aria-label="main mailbox folders">
            <NavLink exact activeClassName='active' className="nav-link" to="/">
                <ListItem button>
                    <ListItemText primary="Posts" />
                </ListItem>
            </NavLink>
            <NavLink activeClassName='active' className="nav-link" to="/personal">
                <ListItem button>
                    <ListItemText primary="Personal Area" />
                </ListItem>
            </NavLink>
            <ListItem style={{ width: '100px' }} button>
                <Button onClick={logout} style={{ color: 'white' }}>Logout</Button>
            </ListItem>
        </List >
    )
};

const NoLoggedLinks = (
    <List component="nav" style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }} aria-label="main mailbox folders">
        <NavLink exact activeClassName='active' className="nav-link" to="/">
            <ListItem button>
                <ListItemText primary="Posts" />
            </ListItem>
        </NavLink>
        <NavLink activeClassName='active' className="nav-link" to="/login">
            <ListItem button>
                <ListItemText primary="Sign in" />
            </ListItem>
        </NavLink>
        <NavLink activeClassName='active' className="nav-link" to="/register">
            <ListItem button>
                <ListItemText primary="Sign up" />
            </ListItem>
        </NavLink>
    </List >
);

const Header = ({ isLogged, username, logout }) => {
    const renderLinks = isLogged ? <IsLoggedLinks username={username} logout={logout} /> : NoLoggedLinks;
    return (
        <div style={{ background: '#545454' }}>
            {renderLinks}
        </div>

    )
};

const mapStateToProps = ({ users: { isLogged, username } }) => {
    return {
        isLogged: isLogged,
        username: username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);