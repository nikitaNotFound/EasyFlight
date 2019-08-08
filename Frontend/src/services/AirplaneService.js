export function getAll () {
    const seatTypes = {
        economClass: 0,
        businesClass: 1,
        firstClass: 2
    }

    return new Promise (
        (resolve, reject) => {
            const data = [
                {
                    id: 1, name:'F300', maxMass: 1000, seats: [
                        new Seat(1, 1, 1, 1, seatTypes.economClass), new Seat(1, 1, 1, 2, seatTypes.economClass),
                        new Seat(1, 1, 2, 1, seatTypes.economClass), new Seat(1, 1, 2, 2, seatTypes.economClass),
        
                        new Seat(1, 2, 1, 1, seatTypes.businesClass), new Seat(1, 2, 1, 2, seatTypes.businesClass),
                        new Seat(1, 2, 2, 1, seatTypes.businesClass), new Seat(1, 2, 2, 2, seatTypes.businesClass)
                    ]
                },
                {
                    id: 2, name:'Keksik', maxMass: 500, seats: [
                        new Seat(1, 1, 1, 1, seatTypes.economClass), new Seat(1, 1, 1, 2, seatTypes.economClass)
                    ]
                }
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

class Seat {
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

export default Seat;