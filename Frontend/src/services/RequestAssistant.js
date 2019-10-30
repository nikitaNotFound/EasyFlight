import { BadRequestError, NotFoundError } from './RequestErrors';
import HttpStatus from 'http-status-codes';

import AuthTokenProvider from './AuthTokenProvider';

export async function createRequestResult(response, requestType) {
    if (response.ok) {
        if (requestType == RequestTypes.ContentExpected) {
            var result = await response.json();
        } else {
            var result = null;
        }

        return result;
    } else {
        if (response.status == HttpStatus.BAD_REQUEST) {
            throw new BadRequestError();
        } else if (response.status == HttpStatus.NOT_FOUND) {
            throw new NotFoundError();
        } else {
            throw new Error();
        }
    }
}

export const RequestTypes = {
    ContentExpected: 0,
    NoContentExpected: 1
}

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AuthTokenProvider.getToken()}`
}