import * as HttpStatus from 'http-status-codes';
import * as errors from './Errors';

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
            throw new errors.BadRequestError();
        } else {
            throw new Error(HttpStatus.getStatusText(response.status));
        }
    }
}