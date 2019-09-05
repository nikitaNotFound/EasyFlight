import {countries, cities} from './DataBase';

export function getCountryById(id) {
    return new Promise(
        (resolve, reject) => {
            const data = countries;

            let foundCountry = null;
            for (let i = 0, len = data.length; i < len; i++) {
                if (data[i].id == id) {
                    foundCountry = data[i];
                }
            }

            if (!foundCountry) {
                reject('Error');
            }

            resolve(foundCountry);
        }
    );
}

export function getCityById(id) {
    return new Promise(
        (resolve, reject) => {
            const data = cities;

            let foundCity = null;
            for (let i = 0, len = data.length; i < len; i++) {
                if (data[i].id == id) {
                    foundCity = data[i];
                }
            }

            if(!foundCity) {
                reject('Error');
            }

            resolve(foundCity);
        }
    );
}

export function searchCountries(searchPhrase) {
    return new Promise(
        (resolve, reject) => {
            const storage = countries;
            let foundCountries = [];

            const searchReg = new RegExp('^' + searchPhrase, 'ig');

            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].name.match(searchReg)) {
                    foundCountries.push(storage[i]);
                }
            }
            //IN FUTURE HERE WILL BE CHECKING OF SUCCESFULL REQUEST TO THE API
            if (false) {
                reject("Error");
            }

            resolve(foundCountries);
        }
    );
}

export function searchCities(searchPhrase, args) {
    return new Promise(
        (resolve, reject) => {
            const storage = cities;
            const [countryId] = args

            let foundCities = [];

            const searchReg = new RegExp('^' + searchPhrase, 'ig');

            for (let i = 0, len = storage.length; i < len; i++) {
                if (storage[i].name.match(searchReg) && storage[i].countryId == countryId) {
                    foundCities.push(storage[i]);
                }
            }
            //IN FUTURE HERE WILL BE CHECKING OF SUCCESFULL REQUEST TO THE API
            if (false) {
                reject("Error");
            }

            resolve(foundCities);
        }
    );
}