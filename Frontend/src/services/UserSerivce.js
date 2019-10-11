import { users, userFlights } from './DataBase';
import { isArray } from 'util';
import User from './user-models/user';

import store from '../store/store';
import * as types from '../store/ActionTypes';

export function getCurrentUser(id) {
    return new Promise((resolve, reject) => {
        const data = users;

        let user = {};
        for (let i = 0, len = data.length; i < len; i++) {
            const element = data[i];

            if (element.id == id) {
                user = element;
            }
        }

        if (!user) {
            reject("Error");
        }
        resolve(user);
    });
}

export function getUserFlights(userId) {
    return new Promise((resolve, reject) => {
        let data = [];

        for (let i = 0, len = userFlights.length; i < len; i++) {
            const element = userFlights[i];
            if (element.userId == userId) {
                data.push(element);
            }
        }

        if (!data && !isArray(data)) {
            reject("Error");
        }
        resolve(data);
    });
}

export async function login(user) {
    try {

    } catch {
        
    }
    let foundUser = null;

    for (let i = 0, len = users.length; i < len; i++) {
        if (users[i].email == user.email && users[i].password == user.password) {
            foundUser = users[i];
        }
    }

    if (!foundUser) {
        return false;
    }

    const foundUserInfo = new User(foundUser.id, foundUser.firstame, foundUser.role);

    store.dispatch({ type: types.CHANGE_AUTH_TOKEN, payload: "AUTH_TOKEN_KEY" });
    store.dispatch({ type: types.CHANGE_REFRESH_TOKEN, payload: "REFRESH_TOKEN_KEY" });
    store.dispatch({ type: types.CHANGE_USER_INFO, payload: foundUserInfo });

    return true;
}

export function logout() {
    return new Promise(resolve => {
        store.dispatch({ type: types.CHANGE_AUTH_TOKEN, payload: null });
        store.dispatch({ type: types.CHANGE_REFRESH_TOKEN, payload: null });
        store.dispatch({ type: types.CHANGE_USER_INFO, payload: null });

        resolve(true);
    });
}

export function checkLogin() {
    const storeObject = store.getState();

    if (!storeObject.authToken || !storeObject.userInfo) {
        return { authorized: false, admin: false};
    }

    return { authorized: true, admin: storeObject.userInfo.role == 'Admin' ? true : false };
}