import { createRequestResult, headers, RequestTypes } from './RequestAssistant';

import * as config from '../config.json';

export async function getById(id) {
    const response = await fetch(
        `${config.API_URL}/flights/${id}`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers()
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
            headers: headers(),
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
            headers: headers(),
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
            headers: headers()
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
            headers: headers(),
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
            headers: headers(),
            body: JSON.stringify(ticketCost)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function searchWithParams(filter) {
    var {
        fromAirportId,
        toAirportId,
        fromCityId,
        toCityId,
        departureDate,
        arrivalDate,
        ticketCount,
        searchBack,
        currentPage,
        pageLimit,
        departureBackDate,
        arrivalBackDate
    } = filter;

    let parameteres = new URLSearchParams();

    if (!currentPage) {
        // first page
        currentPage = 1;
    }

    parameteres.append('currentPage', currentPage);

    if (!pageLimit) {
        pageLimit = config.DEFAULT_PAGE_LIMIT;
    }

    parameteres.append('pageLimit', pageLimit);

    if (fromAirportId) {
        parameteres.append('fromAirportId', fromAirportId);
    }

    if (toAirportId) {
        parameteres.append('toAirportId', toAirportId);
    }

    if (fromCityId) {
        parameteres.append('fromCityId', fromCityId);
    }

    if (toCityId) {
        parameteres.append('toCityId', toCityId);
    }

    if (departureDate) {
        parameteres.append('departureTime', departureDate);
    }

    if (arrivalDate) {
        parameteres.append('arrivalTime', arrivalDate);
    }

    if (ticketCount) {
        parameteres.append('ticketCount', ticketCount);
    }

    if (searchBack === true) {
        parameteres.append('searchBack', searchBack);

        if (departureBackDate) {
            parameteres.append('departureBackDate', departureBackDate);
        }

        if (arrivalBackDate) {
            parameteres.append('arrivalBackDate', arrivalBackDate);
        }
    }

    const response = await fetch(
        `${config.API_URL}/flights?${parameteres.toString()}`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function bookForTime(bookInfo) {
    const response = await fetch(
        `${config.API_URL}/flights/books`,
        {
            method: 'post',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(bookInfo)
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function finalBook(bookId, transaction) {
    const response = await fetch(
        `${config.API_URL}/flights/books/${bookId}?transaction=${transaction}`,
        {
            method: 'put',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function getAccountFlights() {
    const response = await fetch(
        `${config.API_URL}/flights/books/my`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getFlightBookedSeats(flightId) {
    const response = await fetch(
        `${config.API_URL}/flights/${flightId}/booked-seats`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getBookSeats(bookId) {
    const response = await fetch(
        `${config.API_URL}/flights/books/${bookId}/seats`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getBookStatus(bookId) {
    const response = await fetch(
        `${config.API_URL}/flights/books/${bookId}/status`,
        {
            method: 'get',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}