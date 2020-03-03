import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { closeNotify } from '../../actions';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Notify({ open, text, type, closeNotify }) {
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeNotify();
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={type}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = ({ notify: { open, text, type } }) => {
    return {
        open,
        text,
        type
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeNotify: () => {
            dispatch(closeNotify())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Notify);