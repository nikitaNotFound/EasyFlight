import { users, userFlights } from './DataBase';
import { isArray } from 'util';
import User from './user-models/user';

import { createRequestResult, RequestTypes } from './RequestAssistant';

import AuthTokenProvider from './AuthTokenProvider';
import UserInfoProvider from './UserInfoProvider';

import * as config from '../config.json';

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
        
    const result = await createRequestResult(response, RequestTypes.ContentExpected);

    const token = result.token;
    AuthTokenProvider.saveToken(token);

    const userInfo = new User(
        result.firstName,
        result.secondName,
        result.email,
        null,
        result.role
    );

    UserInfoProvider.saveUserInfo(userInfo);
    return result;
}

export async function register(user) {
    const response = await fetch(
        `${config.API_URL}/accounts/register`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    );
        
    const result = await createRequestResult(response, RequestTypes.ContentExpected);

    const token = result.token;

    AuthTokenProvider.saveToken(token);

    const userInfo = new User(
        result.firstName,
        result.secondName,
        result.email,
        null,
        result.role
    );

    UserInfoProvider.saveUserInfo(userInfo);
    return result;
}

export async function logout() {
    AuthTokenProvider.saveToken(null);
    UserInfoProvider.saveUserInfo(null);
}

export function checkLogin() {
    const token = AuthTokenProvider.getToken();
    const userInfo = UserInfoProvider.getUserInfo();

    if (!token || !userInfo) {
        return { authorized: false, admin: false};
    }

    return { authorized: true, admin: userInfo.role == 1 ? true : false };
}