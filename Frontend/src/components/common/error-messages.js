export function notFound(name = 'Item') {
    return `${name} not found!`;
}

export function duplicate(name = 'Item') {
    return `${name} already exists!`;
}

export function defaultErrorMessage() {
    return 'Something went wrong...';
}

export function invalidInput() {
    return 'Input data is not valid!';
}