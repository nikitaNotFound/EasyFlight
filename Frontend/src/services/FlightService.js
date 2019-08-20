const flights = [
    { id: 1, from: 'test1', to: 'test2', cost: '100$', desc: 'This is a test flight.', airplane: 'F300'},
    { id: 2, from: 'test3', to: 'test4', cost: '1000$', desc: 'This is not a test flight.', airplane: 'Keksik'}
];

export function getAll() {
    return new Promise (
        (resolve, reject) => {
            const data = flights;
            if (data === undefined) {
                reject("Error");
            }
            else {
                setTimeout(resolve, 1000, data);
            }
        }
    );
}

export function getById(id) {
    return new Promise (
        (resolve, reject) => {
            const storage = flights;
            const item = 
                () => {
                    for (let i = 0, len = storage.length; i < len; i++) {
                        if (storage[i].id == id) {
                            return storage[i];
                        }
                    }
                    return undefined;
                }
            if (item === undefined) {
                reject("Error");
            }
            else {
                setTimeout(resolve, 1000, item);
            }
        }
    );
}