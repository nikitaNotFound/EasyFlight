export class BadRequestError extends Error {
    constructor(...rest) {
        super(...rest);
        this.name = 'BadRequestError';
    }
}

export class NotFoundError extends Error {
    constructor(...rest) {
        super(...rest);
        this.name = 'NotFoundError';
    }
}