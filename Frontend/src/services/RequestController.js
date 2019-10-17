import RequestResult from './request-result';

import * as HttpStatus from 'http-status-codes';

export async function createRequestResult(response) {
    if (response.ok) {
        try {
            var responseBody = await response.json();
        } catch {
            var responseBody = null;
        }

        return new RequestResult(true, responseBody);
    } else {
        const responseBody = await response.text();

        let errorInfo = HttpStatus.getStatusText(response.status)

        if (responseBody) {
            errorInfo += ". " + responseBody;
        }

        return new RequestResult(false, errorInfo);
    }
}