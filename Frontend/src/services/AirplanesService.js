export function getAll () {
    const sitsTypes = {
        economClass: 0,
        businesClass: 1,
        firstClass: 2
    }

    return [
        {
            id: 1, name:'F300', maxMass: 1000, seats: [
                new Sit(1, 1, 1, 1, sitsTypes.economClass), new Sit(1, 1, 1, 2, sitsTypes.economClass),
                new Sit(1, 1, 2, 1, sitsTypes.economClass), new Sit(1, 1, 2, 2, sitsTypes.economClass),

                new Sit(1, 2, 1, 1, sitsTypes.businesClass), new Sit(1, 2, 1, 2, sitsTypes.businesClass),
                new Sit(1, 2, 2, 1, sitsTypes.businesClass), new Sit(1, 2, 2, 2, sitsTypes.businesClass)
            ]
        },
        {
            id: 2, name:'Keksik', maxMass: 500, seats: [
                new Sit(1, 1, 1, 1, sitsTypes.economClass), new Sit(1, 1, 1, 2, sitsTypes.economClass)
            ]
        }
    ];
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

class Sit {
    floor;
    section;
    row;
    number;
    type;

    constructor(floor, section, row, number, type) {
        this.floor = floor;
        this.section = section;
        this.row = row;
        this.number = number;
        this.type = type;
    }
}

export default Sit;