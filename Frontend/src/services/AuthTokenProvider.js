import store from '../store/store';
import * as types from '../store/ActionTypes';

const authTokenProvider = {
    getToken: () => {
        return store.getState().authToken;
    },
    saveToken: (token) => {
        store.dispatch({ type: types.CHANGE_AUTH_TOKEN, payload: token });
    }
}

export default authTokenProvider;