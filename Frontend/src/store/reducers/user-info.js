import * as types from '../ActionTypes';

const initialState = null;

export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_USER_INFO:
            return action.payload;

        default:
            return state;
    }
}