import { NameNotDefinedError } from './Errors';

export function notFound(name) {
    if (!name) {
        throw new NameNotDefinedError();
    }

    return `${name} not found!`;
}

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