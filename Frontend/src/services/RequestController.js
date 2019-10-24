import * as HttpStatus from 'http-status-codes';
import { BadRequestError, NotFoundError } from './Errors';

export async function createRequestResult(response) {
    if (response.ok) {
        try {
            var result = await response.json();
        } catch {
            var result = true;
        }

        return result;
    } else {
        if (response.status == 400) {
            throw new BadRequestError();
        } else if (response.status == 404) {
            throw new NotFoundError();
        } else {
            throw new Error(HttpStatus.getStatusText(response.status));
        }
    }
}