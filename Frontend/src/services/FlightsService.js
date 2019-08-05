export function getAll() {
    return [
        { id: 1, from: 'test1', to: 'test2', cost: '100$', desc: 'This is a test flight.', airplane: 'F300'},
        { id: 2, from: 'test3', to: 'test4', cost: '1000$', desc: 'This is not a test flight.', airplane: 'Keksik'}
    ];
}

export function getById(id) {
    const storage = getAll();
    for (let i = 0, len = storage.length; i < len; i++) {
        if (storage[i].id == id) {
            return storage[i];
        }
    }
}