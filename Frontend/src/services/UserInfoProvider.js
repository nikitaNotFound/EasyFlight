import store from '../store/store';
import * as types from '../store/ActionTypes';

const userInfoProvider = {
    getUserInfo: () => {
        return store.getState().userInfo;
    },
    saveUserInfo: (userInfo) => {
        store.dispatch({ type: types.CHANGE_USER_INFO, payload: userInfo });
    }
}

export default userInfoProvider;