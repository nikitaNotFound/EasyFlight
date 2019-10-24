import * as config  from '../config.json';

import { createRequestResult, headers } from './RequestAssistant';

export async function getById(id) {
    const response = await fetch(
        `${config.API_URL}/airports/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, true);
}

export async function add(airport) {
    const response = await fetch(
        `${config.API_URL}/airports`,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(airport)
        }
    );

    return await createRequestResult(response, false);
}

export async function update(airport) {
    const response = await fetch(
        `${config.API_URL}/airports`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(airport)
        }
    );

    return await createRequestResult(response, false);
}

export async function searchByName(nameFilter) {
    const response = await fetch(
        `${config.API_URL}/airports?nameFilter=${nameFilter}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, true);
}