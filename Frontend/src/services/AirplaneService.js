import {airplanes} from './DataBase';

export function getAll() {
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
                setTimeout(resolve, 1000, airplane);
            }
        }
    );
}