import { DOMAIN } from './CONSTANTS';

export function getCountryById(id) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(`${DOMAIN}/api/countries/${id}`);

            if (response.ok) {
                resolve(response.json());
            }

            reject(response.status);
        }
    );
}

export function searchCountries(name) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${DOMAIN}/api/countries/search`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: name})
                }
            );

            if (response.ok) {
                resolve(response.json());
            }

            reject(response.status);
        }
    );
}

export function addCountry(country) {
    return new Promise(
        async (resolve) => {
            const response = await fetch(
                `${DOMAIN}/api/countries/add`,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(country)
                }
            );

            if (response.ok) {
                resolve(true);
            } else {
            resolve(response.json());
            }
        }
    );
}

export function deleteCountry(id) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${DOMAIN}/api/countries/delete/${id}`,
                {
                    method: 'POST'
                }
            );

            if (response.ok) {
                resolve(true);
            }

            reject(response.status);
        }
    );
}

export function updateCountry(country) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${DOMAIN}/api/countries/update`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(country)
                }
            );

            if (response.ok) {
                resolve(true);
            }

            reject(false);
        }
    );
}

export function getCityById(id) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(`${DOMAIN}/api/cities/${id}`);

            if (response.ok) {
                resolve(response.json());
            }

            reject(response.status);
        }
    );
}

export function addCity(city) {
    return new Promise(
        async (resolve) => {
            const response = await fetch(
                `${DOMAIN}/api/cities/add`,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(city)
                }
            );

            if (response.ok) {
                resolve(true);
            } else {
            resolve(response.json());
            }
        }
    );
}

export function deleteCity(id) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${DOMAIN}/api/cities/delete/${id}`,
                {
                    method: 'POST'
                }
            );

            if (response.ok) {
                resolve(true);
            }

            reject(response.status);
        }
    );
}

export function updateCity(city) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${DOMAIN}/api/cities/update`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(city)
                }
            );

            if (response.ok) {
                resolve(true);
            }

            reject(response.status);
        }
    );
}

export function searchCities(name, args) {
    return new Promise(
        async (resolve, reject) => {
            const [countryId] = args;

            const response = await fetch(
                `${DOMAIN}/api/cities/search`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            name: name,
                            countryId: countryId
                        }
                    )
                }
            );

            if (response.ok) {
                resolve(response.json());
            }

            reject(resolve.status);
        }
    );
}