export class BadRequestError extends Error {
    constructor(...rest) {
        super(...rest);
        this.name = 'BadRequestError';
    }
}