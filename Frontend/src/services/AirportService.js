import {airports} from './DataBase';

export function getAirports () {
    return new Promise (
        (resolve, reject) => {
            const data = airports;
            if (data === undefined) {
                reject("Error");
            }
            else {
                setTimeout(resolve, 1000, data);
            }
        }
    );
}

export function getById(id) {
    return new Promise((resolve, reject) => {
            const storage = airports;
            const item = () => {
                for (let i = 0, len = storage.length; i < len; i++) {
                    if (storage[i].id == id) {
                        return storage[i];
                    }
                    return undefined;
                }
            }

            if(item === undefined) {
                reject("Error");
            }

            else {
                setTimeout(resolve, 1000, item);
            }
        }
    );
}