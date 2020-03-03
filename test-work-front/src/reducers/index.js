import {combineReducers} from 'redux';
import users from './users';
import notify from './notify';

export default combineReducers({
    users,
    notify
})