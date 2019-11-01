import * as config from '../config.json';

import { headers, createRequestResult, RequestTypes } from './RequestAssistant';

export async function getById(airplaneId) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
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
            headers: headers,
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
            headers: headers,
            body: JSON.stringify(airplane)
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getByName(airplaneName) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneName}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
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
            headers: headers,
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
            headers: headers,
            body: JSON.stringify(seatType)
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function getAirplaneSeatTypeByName(airplaneId, name) {
    const response = await fetch(
        `${config.API_URL}/airplanes/${airplaneId}/seat-types/${name}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
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
            headers: headers
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
            headers: headers
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
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}

export async function searchWithParams(filter) {
    const {name, carryingMaxKg, carryingMinKg, seatCountMax, seatCountMin} = filter;

    let parameteres = '?';

    if (name) {
        parameteres += `nameFilter=${name}&`;
    }

    if (carryingMinKg) {
        parameteres += `minCarryingKg=${carryingMinKg}&`;
    }
    
    if (carryingMaxKg) {
        parameteres += `maxCarryingKg=${carryingMaxKg}&`;
    }

    if (seatCountMax) {
        parameteres += `maxSeatCount=${seatCountMax}&`;
    }

    if (seatCountMin) {
        parameteres += `minSeatCount=${seatCountMin}&`;
    }

    const response = await fetch(
        `${config.API_URL}/airplanes${parameteres}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
    );

    return await createRequestResult(response, RequestTypes.ContentExpected);
}