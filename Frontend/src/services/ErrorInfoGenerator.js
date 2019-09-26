export default function getErrorInfo(code) {
    switch (code) {
        case 404:
            return 'Not found';
        case 500:
            return 'Server error';
    }
}