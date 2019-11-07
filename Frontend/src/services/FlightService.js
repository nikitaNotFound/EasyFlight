import { createRequestResult, headers, RequestTypes } from './RequestAssistant';

import * as config from '../config.json';

export async function getById(id) {
    const response = await fetch(
        `${config.API_URL}/flights/${id}`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function add(flight) {
    const response = await fetch(
        `${config.API_URL}/flights`,
        {
            method: 'post',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(flight)
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function update(flight) {
    const response = await fetch(
        `${config.API_URL}/flights`,
        {
            method: 'put',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(flight)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function getTicketsCost(flightId) {
    const response = await fetch(
        `${config.API_URL}/flights/${flightId}/seat-types-cost`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function addTicketCost(flightId, ticketCost) {
    const response = await fetch(
        `${config.API_URL}/flights/${flightId}/seat-types-cost`,
        {
            method: 'post',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(ticketCost)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function updateTicketCost(flightId, ticketCost) {
    const response = await fetch(
        `${config.API_URL}/flights/${flightId}/seat-types-cost`,
        {
            method: 'put',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(ticketCost)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function searchWithParams(filter, searchByName) {
    if (searchByName === true) {
        var nameFilter = filter;
    } else {
        var {
            nameFilter,
            fromAirportId,
            toAirportId,
            fromCityId,
            toCityId,
            departureDate,
            arrivalDate,
            ticketsCount,
            searchBack
        } = filter;
    }

    let parameteres = '?';

    if (nameFilter) {
        parameteres += `nameFilter=${nameFilter}&`;
    }

    if (fromAirportId) {
        parameteres += `fromAirportId=${fromAirportId}&`;
    }

    if (toAirportId) {
        parameteres += `toAirportId=${toAirportId}&`;
    }

    if (fromCityId) {
        parameteres += `fromCityId=${fromCityId}&`;
    }

    if (toCityId) {
        parameteres += `toCityId=${toCityId}&`;
    }

    if (departureDate) {
        parameteres += `departureTime=${departureDate}&`;
    }

    if (arrivalDate) {
        parameteres += `arrivalTime=${arrivalDate}&`;
    }

    if (ticketsCount) {
        parameteres += `ticketsCount=${ticketsCount}&`;
    }

    if (searchBack === true) {
        parameteres += `searchBack=${searchBack}`;
    }

    const response = await fetch(
        `${config.API_URL}/flights${parameteres}`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}