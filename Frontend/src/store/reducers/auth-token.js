import * as types from '../ActionTypes';

const initialState = {
    authToken: null
}

export default function authToken(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_AUTH_TOKEN:
            return {
                authToken: action.payload
            }
            
        default:
            return state;
    }
}