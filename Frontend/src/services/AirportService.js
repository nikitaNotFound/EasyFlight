import * as config from '../config.json';

import * as RequestController from './RequestController';
import * as HttpStatus from 'http-status-codes';

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

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
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

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
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

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function searchByName(name) {
    try {
        var response = await fetch(
            `${config.API_URL}/airports?nameFilter=${name}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}