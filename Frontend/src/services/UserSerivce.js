import {users, userFlights} from './DataBase';
import { isArray } from 'util';

export function getCurrentUser(id) {
    return new Promise(
        (resolve, reject) => {
            const data = users;

            let user = {};
            for (let i = 0, len = data.length; i < len; i++) {
                const element = data[i];

                if (element.id == id) {
                    user = element;
                }
            }

            if (!user) {
                reject('Error');
            }
            setTimeout(resolve, 1000, user);
        }
    );
}

export function getUserFlights(userId) {
    return new Promise(
        (resolve, reject) => {
            const data = [];

            for (let i = 0, len = userFlights.length; i < len; i++) {
                const element = userFlights[i];
                if (element.userId == userId) {
                    data.push(element);
                }
            }

            if (!data && !isArray(data)) {
                reject("Error");
            }
            setTimeout(resolve, 1000, data);
        }
    );
}