import * as config from '../config.json';

import * as RequestController from './RequestController';

import RequestResult from './request-result';

export async function getById(id) {
    try {
        var response = await fetch(
            `${config.API_URL}/airports/${id}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return RequestController.formResult(response);
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
        return new RequestResult(false, errorInfo);
    }
}

export async function add(airport) {
    try {
        var response = await fetch(
            `${config.API_URL}/airports`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(airport)
            }
        );

        return RequestController.formResult(response);
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
        return new RequestResult(false, errorInfo);
    }
}

export async function update(airport) {
    try {
        var response = await fetch(
            `${config.API_URL}/airports/${airport.id}`,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(airport)
            }
        );

        return RequestController.formResult(response);
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
        return new RequestResult(false, errorInfo);
    }
}

export async function search(params) {
    try {
        var response = await fetch(
            `${config.API_URL}/airports/searches`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            }
        );

        return RequestController.formResult(response);
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
        return new RequestResult(false, errorInfo);
    }
}