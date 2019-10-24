import { BadRequestError, NotFoundError } from './Errors';

export async function createRequestResult(response, expectedContent) {
    if (response.ok) {
        if (expectedContent) {
            try {
                var result = await response.json();
            } catch {
                throw new Error();
            }
        } else {
            var result = null;
        }

        return result;
    } else {
        if (response.status == 400) {
            throw new BadRequestError();
        } else if (response.status == 404) {
            throw new NotFoundError();
        } else {
            throw new Error();
        }
    }
}