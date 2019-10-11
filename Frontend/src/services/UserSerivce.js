import { users, userFlights } from './DataBase';
import { isArray } from 'util';
import User from './user-models/user';

import * as RequestController from './RequestController';

import RequestResult from './request-result';

import store from '../store/store';
import * as types from '../store/ActionTypes';

import * as config from '../config.json';

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
        const response = await fetch(
            `${config.API_URL}/accounts/login`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const result = RequestController.formResult(response);

        if (result.successful === false) {
            alert(1)
            return result;
        } else {
            const token = result.value.token;
            alert(token);

            store.dispatch({ type: types.CHANGE_AUTH_TOKEN, payload: token });

            const userInfo = new User(
                result.value.firstName,
                result.value.secondName,
                result.value.email,
                result.value.role
            );
            store.dispatch({ type: types.CHANGE_USER_INFO, payload: userInfo });
        }
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
        return new RequestResult(false, errorInfo);
    }
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