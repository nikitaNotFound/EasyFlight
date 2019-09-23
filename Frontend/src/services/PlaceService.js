import * as config  from '../config.json';

import * as RequestController from './RequestController';

import RequestResult from './request-result';

export function getCountryById(id) {
    return new Promise(async resolve => {
        try {
            var response = await fetch(
                `$}/api/countries/${id}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                }
            });

            resolve(RequestController.formResult(response));
        } catch {
            const errorInfo = RequestController.getErrorInfo(500);
            resolve(new RequestResult(false, errorInfo));
        }
    });
}

export function searchCountriesByName(nameFilter) {
    return new Promise(async resolve => {
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

            resolve(RequestController.formResult(response));
        } catch {
            const errorInfo = RequestController.getErrorInfo(500);
            resolve(new RequestResult(false, errorInfo));
        }
    });
}

export function addCountry(country) {
    return new Promise(async resolve => {
        try {
            const response = await fetch(`${config.API_URL}/api/countries`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(country)
            });

            resolve(RequestController.formResult(response));
        } catch {
            const errorInfo = RequestController.getErrorInfo(500);
            resolve(new RequestResult(false, errorInfo));
        }
    });
}

export function updateCountry(country) {
    return new Promise(async resolve => {
        try {
            const response = await fetch(`${config.API_URL}/countries`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(country)
            });

            resolve(RequestController.formResult(response));
        } catch {
            const errorInfo = RequestController.getErrorInfo(500);
            resolve(new RequestResult(false, errorInfo));
        }
    });
}

export function getCityById(id) {
    return new Promise(async resolve => {
        try {
            const response = await fetch(`${config.API_URL}/api/cities/${id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            resolve(RequestController.formResult(response));
        } catch {
            const errorInfo = RequestController.getErrorInfo(500);
            resolve(new RequestResult(false, errorInfo));
        }
    });
}

export function addCity(city) {
    return new Promise(async resolve => {
        try {
            const response = await fetch(`${config.API_URL}/api/cities`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(city)
            });

            resolve(RequestController.formResult(response));
        } catch {
            const errorInfo = RequestController.getErrorInfo(500);
            resolve(new RequestResult(false, errorInfo));
        }
    });
}

export function updateCity(city) {
    return new Promise(async resolve => {
        try {
            const response = await fetch(
                `${config.API_URL}/cities`,
                {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify(city)
            });

            resolve(RequestController.formResult(response));
        } catch {
            const errorInfo = RequestController.getErrorInfo(500);
            resolve(new RequestResult(false, errorInfo));
        }
    });
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
        return RequestController.formResult(response);
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
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
        return RequestController.formResult(response);
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
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
        return RequestController.formResult(response);
    } catch {
        const errorInfo = RequestController.getErrorInfo(500);
        return new RequestResult(false, errorInfo);
    }
}