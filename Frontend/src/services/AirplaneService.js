import {airplanes} from './DataBase';

export function getAirplanes() {
    return new Promise (
        (resolve, reject) => {
            const data = airplanes;
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
        const storage = airplanes;
        const item = () => {
            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].id == id) {
                    return storage[i];
                }
            }
            return undefined;
        }

        if (item === undefined) {
            reject("Error");
        }
        else {
            setTimeout(resolve, 1000, item);
        }
    });
}