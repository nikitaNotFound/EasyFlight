import * as types from '../ActionTypes';

const initialState = {
    userInfo: null
}

export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_USER_INFO:
            return {
                userInfo: action.payload
            }

        default:
            return state;
    }
}