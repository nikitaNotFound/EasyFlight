import * as config  from '../config.json';

import { createRequestResult, RequestTypes, headers } from './RequestAssistant';

export async function getById(id) {
    const response = await fetch(
        `${config.API_URL}/countries/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function searchByName(nameFilter) {
    const response = await fetch(
        `${config.API_URL}/countries?nameFilter=${encodeURIComponent(nameFilter)}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function add(country) {
    const response = await fetch(
        `${config.API_URL}/countries`,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(country)
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}

export async function update(country) {
    const response = await fetch(
        `${config.API_URL}/countries`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(country)
        }
    );

    return createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function getCountryCities(countryId) {
    const response = await fetch(
        `${config.API_URL}/countries/${countryId}/cities`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}

export async function searchCountryCitiesByName(countryId, nameFilter) {
    const response = await fetch(
        `${config.API_URL}/countries/${countryId}/cities?nameFilter=${encodeURIComponent(nameFilter)}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return createRequestResult(response, RequestTypes.ContentExpected);
}