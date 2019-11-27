import * as config  from '../config.json';

import { createRequestResult, headers, RequestTypes } from './RequestAssistant';

export async function getById(id) {
    const response = await fetch(
        `${config.API_URL}/airports/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function add(airport) {
    const response = await fetch(
        `${config.API_URL}/airports`,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(airport)
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function update(airport) {
    const response = await fetch(
        `${config.API_URL}/airports`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(airport)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function searchByName(nameFilter) {
    const response = await fetch(
        `${config.API_URL}/airports?nameFilter=${encodeURIComponent(nameFilter)}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}