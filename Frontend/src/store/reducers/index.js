import { combineReducers } from 'redux';

import authToken from './auth-token';
import refreshToken from './refresh-token';
import userInfo from './user-info';

export default combineReducers({
    authToken,
    refreshToken,
    userInfo
});