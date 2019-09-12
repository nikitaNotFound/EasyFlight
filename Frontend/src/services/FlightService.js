import {flights, ticketsCost} from './DataBase';
import * as AirportService from '../services/AirportService';

export function getAll() {
    return new Promise (
        (resolve, reject) => {
            const data = flights;
            if (!data) {
                reject("Error");
            }
            resolve(data);
        }
    );
}

export function getById(id) {
    return new Promise (
        (resolve, reject) => {
            const storage = flights;
            let flight = {};
            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].id == id) {
                    flight = storage[i];
                }
            }

            if (!flight) {
                reject("Error");
            }
            else {
                resolve(flight);
            }
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
                for (let i = 0, len = flights.length; i < len; i++) {
                    const element = flights[i];

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

export function getTicketsCost(id) {
    return new Promise(
        (resolve, reject) => {
            const data = ticketsCost;
            let ticketsCostInfo = data.reduce(
                (array, ticketCost) => {
                    if (ticketCost.flightId == id) {
                        array.push(ticketCost);
                    }
                    return array;
                },
                []
            );

            if (!ticketsCostInfo) {
                reject("Error");
            }
            resolve(ticketsCostInfo);
        }
    );
}

export function searchWithParams(params) {
    return new Promise(
        async (resolve, reject) => {
            const data = flights;

            let foundFlights = [];

            for (let i = 0, len = data.length; i < len; i++) {
                const element = data[i];
                const fromAirplane = await AirportService.getById(element.fromId);
                const toAirplane = await AirportService.getById(element.toId);

                const fromCityId = fromAirplane.cityId;
                const toCityId = toAirplane.cityId;

                const [departureTime] = element.departureTime.split(' ');
                const [departureBackTime] = element.departureBackTime.split(' ');
                
                if (params.searchToAndBack
                    && ((params.fromCity && toCityId == params.fromCity.id)
                        || (params.fromAirport && element.toId == params.fromAirport.id))
                ) {
                    if (!params.fromAirport
                        && params.fromCity
                        && !(toCityId == params.formCity.id)
                    ) {
                        continue;
                    }

                    if (!params.toAirport
                        && params.toCity
                        && !(fromCityId == params.toCity.id)
                    ) {
                        continue;
                    }

                    if (params.toAirport
                        && !(element.fromId == params.toAirport.id)
                    ) {
                        continue;
                    }

                    if (params.fromAirport
                        && !(element.toId == params.fromAirport.id)
                    ) {
                        continue;
                    }
                }

                else {
                    if (params.fromAirport
                        && !(element.fromId == params.fromAirport.id)
                    ) {
                        continue;
                    }
    
                    if (params.toAirport
                        && !(element.toId == params.toAirport.id)
                    ) {
                        continue;
                    }

                    if (!params.fromAirport
                        && params.fromCity
                        && !(fromCityId == params.fromCity.id)
                    ) {
                        continue;
                    }

                    if (!params.toAirport
                        && params.toCity
                        && !(toCityId == params.toCity.id)
                    ) {
                        continue;
                    }
                }

                if (params.departureDate
                    && !(departureTime == params.departureDate)
                ) {
                    continue;
                }

                if (params.departureBackDate
                    && !(departureBackTime == params.departureBackDate)
                ) {
                    continue;
                }
                
                if (params.ticketCount
                    && !(element.ticketsLeft > params.ticketCount)
                ) {
                    continue;
                }

                foundFlights.push(element);
            }

            if (!foundFlights) {
                reject('Error');
            }

            resolve(foundFlights);
        }
    );
}