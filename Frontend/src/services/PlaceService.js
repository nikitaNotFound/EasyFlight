import * as config  from '../config.json';

import { createRequestResult, RequestTypes, headers } from './RequestAssistant';

export async function getCountryById(id) {
    const response = await fetch(
        `${config.API_URL}/countries/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function searchCountriesByName(nameFilter) {
    const response = await fetch(
        `${config.API_URL}/countries?nameFilter=${nameFilter}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getCountryCities(countryId) {
    try {
        const response = await fetch(
            `${config.API_URL}/countries/${countryId}/cities`,
            {
                method: 'GET',
                mode: 'cors',
                headers: RequestController.headers
            }
        );
        return RequestController.createRequestResult(response);
    } catch {
        const errorInfo = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        return new RequestResult(false, errorInfo);
    }
}

export async function addCountry(country) {
    const response = await fetch(
        `${config.API_URL}/countries`,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(country)
        }
    );

    return createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function updateCountry(country) {
    const response = await fetch(
        `${config.API_URL}/countries`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(country)
        }
    );

    return createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function getCityById(id) {
    const response = await fetch(
        `${config.API_URL}/cities/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}

export async function addCity(city) {
    const response = await fetch(
        `${config.API_URL}/cities`,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(city)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function updateCity(city) {
    const response = await fetch(
        `${config.API_URL}/cities`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(city)
        }
    );

    return createRequestResult(response, RequestTypes.ContentNonExpected);
}

export async function searchCitiesByName(nameFilter) {
    const response = await fetch(
        `${config.API_URL}/cities?nameFilter=${nameFilter}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );
    
    return createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getCountryCities(countryId) {
    const response = await fetch(
        `${config.API_URL}/countries/${countryId}/cities`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}

export async function searchCountryCitiesByName(countryId, nameFilter) {
    const response = await fetch(
        `${config.API_URL}/countries/${countryId}/cities?nameFilter=${nameFilter}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getCityAirports(cityId) {
    const response = await fetch(
        `${config.API_URL}/cities/${cityId}/airports`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );
    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function searchCityAirportsByName(cityId, nameFilter) {
    const response = await fetch(
        `${config.API_URL}/cities/${cityId}/airports?nameFilter=${nameFilter}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}