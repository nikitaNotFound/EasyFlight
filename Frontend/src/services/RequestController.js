import RequestResult from './request-result';

export function getErrorInfo(code) {
    switch (code) {
        case 400:
            return 'Conflict';
        case 404:
            return 'Not found';
        case 500:
            return 'Server error';
    }
}

export async function formResult(response) {
    if (response.ok) {
        try {
            var responseBody = await response.json();
        } catch {}

        return new RequestResult(true, responseBody);
    } else {
        try {
            var responseBody = await response.text();
        } catch {}

        let errorInfo = getErrorInfo(response.status);

        if (responseBody) {
            errorInfo += ". " + responseBody;
        }

        return new RequestResult(false, errorInfo);
    }
}