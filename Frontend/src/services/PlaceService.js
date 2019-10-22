import * as config  from '../config.json';

import * as RequestController from './RequestController';

export async function getCountryById(id) {
    var response = await fetch(
        `${config.API_URL}/countries/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
        }
    });

    return await RequestController.createRequestResult(response);
}

export async function searchCountriesByName(nameFilter) {
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

    return await RequestController.createRequestResult(response);
}

export async function addCountry(country) {
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
}

export async function updateCountry(country) {
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
}

export async function getCityById(id) {
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
}

export async function addCity(city) {
    const response = await fetch(
        `${config.API_URL}/cities`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(city)
        }
    );

    return await RequestController.createRequestResult(response);
}

export async function updateCity(city) {
    const response = await fetch(
        `${config.API_URL}/cities`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(city)
        }
    );

    return RequestController.createRequestResult(response);
}

export async function searchCitiesByName(nameFilter) {
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
}

export async function getCountryCities(countryId) {
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
}

export async function searchCountryCitiesByName(countryId, nameFilter) {
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
}