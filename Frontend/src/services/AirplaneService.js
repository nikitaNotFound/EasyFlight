import {airplanes} from './DataBase';

export function getAll() {
    return new Promise (
        (resolve, reject) => {
            const data = airplanes;
            if (!data) {
                reject("Error");
            }
            else {
                resolve(data);
            }
        }
    );
}

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
            }
            else {
                resolve(airplane);
            }
        }
    );
}

export function search(searchPhrase) {
    return new Promise(
        (resolve, reject) => {
            const storage = airplanes;
            let foundAirplanes = [];

            const searchReg = new RegExp('^' + searchPhrase, 'ig');

            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].name.match(searchReg)) {
                    foundAirplanes.push(storage[i]);
                }
            }
            //IN FUTURE HERE WILL BE CHECKING OF SUCCESFULL REQUEST TO THE API
            if (false) {
                reject("Error");
            }

            resolve(foundAirplanes);
        }
    );
}

export function searchWithParams(params) {
    return new Promise(
        (resolve, reject) => {
            const data = airplanes;

            const carryingMin = params.carryingMin
                ? params.carryingMin
                : 0;
            const carryingMax = params.carryingMax
                ? params.carryingMax
                : Infinity;

            const seatCountMin = params.seatCountMin
                ? params.seatCountMin
                : 0;
            const seatCountMax = params.seatCountMax
                ? params.seatCountMax
                : Infinity;

            let foundAirplanes = [];

            for (let i = 0, len = data.length; i < len; i++) {
                const element = data[i];

                if (params.name) {
                    const searchReg = new RegExp('^' + params.name, 'ig');

                    if (!element.name.match(searchReg)) {
                        continue;
                    }
                }

                if (carryingMax
                    && (carryingMin || carryingMin == 0)
                    && !((element.carrying > carryingMin) && (element.carrying < carryingMax))
                ) {
                    continue;
                }
                

                if (seatCountMax
                    && (seatCountMin || seatCountMin == 0)
                    && !((element.seats.length > seatCountMin) && (element.seats.length < seatCountMax))
                ) {
                    continue;
                }

                foundAirplanes.push(element);
            }

            if (!foundAirplanes) {
                reject('Error');
            }
            resolve(foundAirplanes);
        }
    );
}