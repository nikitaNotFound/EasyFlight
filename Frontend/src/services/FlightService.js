import {flights} from './DataBase';

export function getAll() {
    return new Promise (
        (resolve, reject) => {
            const data = flights;
            if (!data) {
                reject("Error");
            }
            setTimeout(resolve, 1000, data);
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
                setTimeout(resolve, 1000, flight);
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
                const currentUserId = idArray[j];
                for (let i = 0, len = flights.length; i < len; i++) {
                    const element = flights[i];

                    if (element.id == currentUserId) {
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