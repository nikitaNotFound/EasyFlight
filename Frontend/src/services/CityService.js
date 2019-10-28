import * as config  from '../config.json';

import { createRequestResult, RequestTypes, headers } from './RequestAssistant';

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