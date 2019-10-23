import {airplanes} from './DataBase';

import * as config from '../config.json';

import * as RequestController from './RequestController';

export function getById(id) {
    return new Promise(
        (resolve, reject) => {
            const storage = airplanes;
            let airplane = {};
            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].id == id) {
                    airplane = storage[i];
                }
            }

            if (!airplane) {
                reject("Error");
            } else {
                resolve(airplane);
            }
        }
    );
}

export async function searchWithParams(filter) {
    const {name, carryingMaxKg, carryingMinKg, seatCountMax, seatCountMin} = filter;

    const response = fetch(
        `${config.API_URL}/airplanes
            ?nameFilter=${name}
            &minCarryingKg=${carryingMinKg}
            &maxCarryingKg=${carryingMaxKg}
            &minSeatCount=${seatCountMin}
            &maxSeatCount=${seatCountMax}
        `,
        {
            method: 'GET',
            mode: 'cors',
            headers: RequestController.headers
        }
    );

    return RequestController.createRequestResult(response);
}