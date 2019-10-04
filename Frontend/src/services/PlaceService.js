import { API_URL } from '../config';

export async function getCountryById(id) {
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
        return response.json();
    }

    console.log(response.status);
    return response.status;
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

    console.log(response.status);
    return response.status;
}

export async function addCountry(country) {
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
        return true;
    }

    console.log(response.status);
    return false;
}

export async function updateCountry(country) {
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
       return true;
    }

    console.log(response.status);
    return false;
}

export async function getCityById(id) {
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
        return response.json();
    }

    console.log(response.status);
    return response.status;
}

export async function addCity(city) {
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
        return true;
    }

    console.log(response.status);
    return response.json();
}

export async function updateCity(city) {
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
        return true;
    }

    console.log(response.status);
    return response.status;
}

export async function searchCities(name, args) {
    const [countryId] = args;

    const response = await fetch(
        `${API_URL}/cities/searches`,
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
        return response.json();
    }

    console.log(response.status);
    return response.status;
}