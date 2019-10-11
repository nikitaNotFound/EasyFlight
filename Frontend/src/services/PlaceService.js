import * as config  from '../config.json';

export async function getCountryById(id) {
    const response = await fetch(
        `${config.API_URL}/countries/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.ok) {
        return response.json();
    }

    return response.status;
}

export async function searchCountries(name) {
    const response = await fetch(
        `${config.API_URL}/countries?nameFilter=${name}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );

    if (response.ok) {
        return response.json();
    }

    return response.status;
}

export async function addCountry(country) {
    const response = await fetch(
        `${config.API_URL}/countries`,
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
        return true;
    }

    return false;
}

export async function updateCountry(country) {
    const response = await fetch(
        `${config.API_URL}/countries`,
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
       return true;
    }

    return false;
}

export async function getCityById(id) {
    const response = await fetch(
        `${config.API_URL}/cities/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.ok) {
        return response.json();
    }

    return response.status;
}

export async function addCity(city) {
    const response = await fetch(
        `${config.API_URL}/cities`,
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
        return true;
    }

    return response.json();
}

export async function updateCity(city) {
    const response = await fetch(
        `${config.API_URL}/cities`,
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
        return true;
    }

    return response.status;
}

export async function searchCitiesByName(name) {
    const response = await fetch(
        `${config.API_URL}/cities?nameFilter=${name}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.ok) {
        return response.json();
    }

    return response.status;
}

export async function getCountryCities(countryId) {
    const response = await fetch(
        `${config.API_URL}/countries/${countryId}/cities`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.ok) {
        return response.json();
    }

    return response.status;
}

export async function getCountryCitiesByName(name, countryId) {
    const response = await fetch(
        `${config.API_URL}/countries/${countryId}/cities?nameFilter=${name}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.ok) {
        return response.json();
    }

    return response.status;
}