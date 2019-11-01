import * as types from '../ActionTypes'

import store from '../store';

export function changeUserInfo(userInfo) {
    const action = {
        type: types.CHANGE_USER_INFO,
        payload: userInfo
    }

    store.dispatch(action);
}