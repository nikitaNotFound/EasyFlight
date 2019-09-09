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