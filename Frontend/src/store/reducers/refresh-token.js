import * as types from '../ActionTypes';

const initialState = {
    refreshToken: null
}

export default function refreshToken(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_REFRESH_TOKEN:
            return {
                refreshToken: action.payload
            }

        default:
            return state;
    }
}