export function getAll () {
    return new Promise (
        (resolve, reject) => {
            const data = [
                {id: 1, name:"Minsk airport", country:"Belarus", city:"Minsk", desc:"Biggest airport in Belarus"},
                {id: 2, name:"Kiev airport", country:"Ukraine", city:"Kiev", desc:"Biggest airport in Ukraine"}
            ];
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
    const storage = getAll();
    for (let i = 0, len = storage.length; i < len; i++) {
        if (storage[i].id == id) {
            return storage[i];
        }
    }
    return undefined;
}