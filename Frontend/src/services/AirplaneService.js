import * as config from '../config.json';

import { headers, createRequestResult, RequestTypes } from './RequestAssistant';

export async function getById(airplaneId) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function update(airplane) {
    const response = await fetch(
        `${config.API_URL}/airplanes`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(airplane)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function add(airplane) {
    const response = await fetch(
        `${config.API_URL}/airplanes`,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(airplane)
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function updateAirplaneSeats(airplaneId, seats) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}/seats`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(seats)
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}


export async function addAirplaneSeatType(airplaneId, seatType) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}/seat-types`,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(seatType)
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function deleteAirplaneSeatType(airplaneId, seatTypeId) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}/seat-types/${seatTypeId}`,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.NoContentExpected);
}

export async function getAirplaneSeats(airplaneId) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}/seats`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getSeatById(seatId) {
    const response = await fetch(
        `${config.API_URL}/airplanes/seats/${seatId}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getSeatTypeById(seatTypeId) {
    const response = await fetch(
        `${config.API_URL}/airplanes/seat-types/${seatTypeId}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getAirplaneSeatTypes(airplaneId) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}/seat-types`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function searchWithParams(filter, nameSearchOnly) {
    if (nameSearchOnly === true) {
        var nameFilter = filter;
    } else {
        var {
            nameFilter,
            carryingMaxKg,
            carryingMinKg,
            seatCountMax,
            seatCountMin,
            currentPage,
            pageLimit
        } = filter;
    }

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

    if (nameFilter) {
        parameteres.append('nameFilter', nameFilter);
    }

    if (carryingMinKg) {
        parameteres.append('minCarryingKg', carryingMinKg);
    }
    
    if (carryingMaxKg) {
        parameteres.append('maxCarryingKg', carryingMaxKg);
    }

    if (seatCountMax) {
        parameteres.append('maxSeatCount', seatCountMax);
    }

    if (seatCountMin) {
        parameteres.append('minSeatCount', seatCountMin);
    }

    const response = await fetch(
        `${config.API_URL}/airplanes?${parameteres.toString()}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers()
        }
    );

    const requestResult = await createRequestResult(response, RequestTypes.ContentExpected);

    if (nameSearchOnly === true) {
        return requestResult.content;
    }

    return requestResult;
}