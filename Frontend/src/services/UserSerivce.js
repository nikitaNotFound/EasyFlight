import User from './user-models/user';

import { createRequestResult, RequestTypes, headers, HeadersTypes } from './RequestAssistant';

import AuthTokenProvider from './AuthTokenProvider';

import AccountRole from './AccountRole';

import * as config from '../config.json';

export async function login(user) {
    const response = await fetch(
        `${config.API_URL}/accounts/login`,
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

    return userInfo;
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

    return userInfo;
}

export async function loginWithGoogle(accessToken) {
    const response = await fetch(
        `${config.API_URL}/accounts/login/google?tokenId=${accessToken}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
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

    return userInfo;
}

export async function registerWithGoogle(accessToken) {
    const response = await fetch(
        `${config.API_URL}/accounts/register/google?tokenId=${accessToken}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
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

    return userInfo;
}

export async function logout() {
    AuthTokenProvider.saveToken(null);
}

export function checkLogin(userInfo) {
    const token = AuthTokenProvider.getToken();

    if (!token || !userInfo) {
        return { authorized: false, admin: false};
    }

    return { authorized: true, admin: userInfo.role === AccountRole.Admin ? true : false };
}

export async function updateName(firstName, secondName) {
    const response = await fetch(
        `${config.API_URL}/accounts/my/name?firstName=${firstName}&secondName=${secondName}`,
        {
            method: 'put',
            mode: 'cors',
            headers: headers()
        }
    );

    return createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function updateAvatar(avatarFormData) {
    const response = await fetch(
        `${config.API_URL}/accounts/my/avatar`,
        {
            method: 'put',
            mode: 'cors',
            headers: headers(HeadersTypes.AuthOnly),
            body: avatarFormData
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getAvatar() {
    const response = await fetch(
        `${config.API_URL}/accounts/my/avatar`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers()
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}