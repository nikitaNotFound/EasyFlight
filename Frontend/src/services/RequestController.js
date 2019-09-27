import RequestResult from './request-result';

export function getErrorInfo(code) {
    switch (code) {
        case 404:
            return 'Not found';
        case 500:
            return 'Server error';
    }
}

export async function formResult(response) {
    try {
        var responseBody = await response.json();
    } catch {}

    console.log(responseBody);
    if (response.ok) {
        return new RequestResult(true, responseBody);
    } else {
        let errorInfo = getErrorInfo(response.status);

        if (responseBody.message) {
            errorInfo += ". " + responseBody.message;
        }

        return new RequestResult(false, errorInfo);
    }
}