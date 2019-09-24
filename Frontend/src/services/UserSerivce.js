import { users, userFlights } from "./DataBase";
import { isArray } from "util";
import UserInfo from "./user-models/user-info";

import store from "../store/store";
import * as types from "../store/ActionTypes";

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

const REFRESH_TOKEN_KEY = "refreshToken";
const AUTH_TOKEN_KEY = "authToken";

export function login(user) {
    return new Promise(resolve => {
        let foundUser = null;

        for (let i = 0, len = users.length; i < len; i++) {
            if (users[i].email == user.email && users[i].password == user.password) {
                foundUser = users[i];
            }
        }

        if (!foundUser) {
            resolve(false);
        }

        const foundUserInfo = new UserInfo(foundUser.id, foundUser.name, foundUser.role);

        store.dispatch({ type: types.CHANGE_AUTH_TOKEN, payload: AUTH_TOKEN_KEY });
        store.dispatch({ type: types.CHANGE_REFRESH_TOKEN, payload: REFRESH_TOKEN_KEY });
        store.dispatch({ type: types.CHANGE_USER_INFO, payload: foundUserInfo });

        resolve(true);
    });
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
    // later there will be api request checks is token valid
    const storeObject = store.getState();

    if (!storeObject.authToken.authToken || !storeObject.refreshToken.refreshToken || !storeObject.userInfo.userInfo) {
        return { status: false, admin: false};
    }

    console.log(storeObject);
    return { status: true, admin: storeObject.userInfo.userInfo.role == 'admin' ? true : false };
}