import {airports} from './DataBase';
import * as PlaceService from './PlaceService';


export function getById(id) {
    return new Promise(
        (resolve, reject) => {
            const storage = airports;
            let airport = {};
            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].id == id) {
                    airport = storage[i];
                }
            }

            if (!airport) {
                reject("Error");
            }

            resolve(airport);
        }
    );
}

export function getByIds(idArray) {
    return new Promise (
        (resolve, reject) => {
            const storage = [];
            
            //later terrible algoritms like this will be replaced by requests
            for (let j = 0, len = idArray.length; j < len; j++) {
                const currentId = idArray[j];
                for (let i = 0, len = airports.length; i < len; i++) {
                    const element = airports[i];

                    if (element.id == currentId) {
                        storage.push(element);
                        break;
                    }
                }
            }

            if (!storage) {
                reject('Error');
            }
            resolve(storage);
        }
    );
}

export async function search(params) {
    return new Promise(
        async (resolve, reject) => {
            const data = airports;

            let foundAirports = [];

            for (let i = 0, len = data.length; i < len; i++) {
                const element = data[i];

                const city = await PlaceService.getCityById(element.cityId);
                const country = await PlaceService.getCountryById(city.countryId);

                if (params.name) {
                    const searchReg = new RegExp('^' + params.name, 'ig');

                    if (!element.name.match(searchReg)) {
                        continue;
                    }
                }

                if (!params.city
                    && params.country
                    && !(country.id == params.country.id)
                ) {
                    continue;
                }

                if (params.city
                    && !(params.city.id == element.cityId)
                ) {
                    continue;
                }

                foundAirports.push(element);
            }

            if (!foundAirports) {
                reject('Error');
            }

            resolve(foundAirports);
        }
    );
}