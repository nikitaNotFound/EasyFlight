import * as config  from '../config.json';

import * as RequestController from './RequestController';
import * as HttpStatus from 'http-status-codes';

import RequestResult from './request-result';

export async function getCountryById(id) {
    try {
        var response = await fetch(
            `${config.API_URL}/countries/${id}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
            }
        });

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function searchCountriesByName(nameFilter) {
    try {
        const response = await fetch(
            `${config.API_URL}/countries?nameFilter=${nameFilter}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function addCountry(country) {
    try {
        const response = await fetch(
            `${config.API_URL}/countries`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(country)
            }
        );

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function updateCountry(country) {
    try {
        const response = await fetch(
            `${config.API_URL}/countries`,
            {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(country)
            }
        );

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function getCityById(id) {
    try {
        const response = await fetch(
            `${config.API_URL}/cities/${id}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function addCity(city) {
    try {
        const response = await fetch(
            `${config.API_URL}/cities`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(city)
        });

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function updateCity(city) {
    try {
        const response = await fetch(
            `${config.API_URL}/cities`,
            {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(city)
        });

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function searchCitiesByName(nameFilter) {
    try {
        const response = await fetch(
            `${config.API_URL}/cities?nameFilter=${nameFilter}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function getCountryCities(countryId) {
    try {
        const response = await fetch(
            `${config.API_URL}/countries/${countryId}/cities`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function searchCountryCitiesByName(countryId, nameFilter) {
    try {
        const response = await fetch(
            `${config.API_URL}/countries/${countryId}/cities?nameFilter=${nameFilter}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}