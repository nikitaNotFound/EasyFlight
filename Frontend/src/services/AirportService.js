import {airports} from './DataBase';

export function getAll () {
    return new Promise (
        (resolve, reject) => {
            const data = airports;
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
            const storage = airports;
            let airport = {};
            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].id == id) {
                    airport = storage[i];
                }
            }

            if(!airport) {
                reject("Error");
            }

            else {
                resolve(airport);
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

export function search(searchPhrase) {
    return new Promise(
        (resolve, reject) => {
            const storage = airports;
            let airplanes = [];

            const searchReg = new RegExp('^' + searchPhrase, 'ig');

            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].name.match(searchReg)) {
                    airplanes.push(storage[i]);
                }
            }
            //IN FUTURE HERE WILL BE CHECKING OF SUCCESFULL REQUEST TO THE API
            if (false) {
                reject("Error");
            }

            resolve(airplanes);
        }
    );
}