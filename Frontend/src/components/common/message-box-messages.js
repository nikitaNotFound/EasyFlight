import { NameNotDefinedError } from './Errors';

export function duplicate(name) {
    if (!name) {
        throw new NameNotDefinedError();
    }

    return `${name} already exists!`;
}

export function defaultErrorMessage() {
    return 'Something went wrong...';
}

export function invalidInput() {
    return 'Input data is not valid!';
}

export function added() {
    return 'Added!';
}

export function saved() {
    return 'Saved!'
}

export function badLoginData() {
    return 'Incorrect login or password!';
}

export function seatTypeInUse() {
    return 'Delete all seats with such type first!';
}

export function seatTypeInvalidInput() {
    return 'You need to define color and name both!';
}

export function seatTypeDuplicate() {
    return 'Seat type with such color or name already exists!';
}

export function flightTimeError() {
    return 'Arrival time can\'t be earlier then departure!';
}