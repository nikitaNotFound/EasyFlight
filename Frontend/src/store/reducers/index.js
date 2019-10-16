import { combineReducers } from 'redux';

import authToken from './auth-token';
import userInfo from './user-info';

export default combineReducers({
    authToken,
    userInfo
});