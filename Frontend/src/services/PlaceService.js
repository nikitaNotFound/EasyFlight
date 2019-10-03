import { API_URL } from '../config';

export function getCountryById(id) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${API_URL}/countries/${id}`,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.ok) {
                resolve(response.json());
            }

            reject(response.status);
        }
    );
}

export async function searchCountries(name) {
    const response = await fetch(
        `${API_URL}/countries/searches`,
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
        return response.json();
    }

    return response.status;
}

export function addCountry(country) {
    return new Promise(
        async (resolve) => {
            const response = await fetch(
                `${API_URL}/countries`,
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
            } else {
            resolve(response.json());
            }
        }
    );
}

export function updateCountry(country) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${API_URL}/countries/${country.id}`,
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
            }

            reject(false);
        }
    );
}

export function getCityById(id) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${API_URL}/cities/${id}`,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

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
                `${API_URL}/cities`,
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
            } else {
            resolve(response.json());
            }
        }
    );
}

export function updateCity(city) {
    return new Promise(
        async (resolve, reject) => {
            const response = await fetch(
                `${API_URL}/cities/${city.id}`,
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
                `${API_URL}/cities`,
                {
                    method: 'GET',
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