class Seat {
    floor;
    section;
    row;
    string;
    number;
    type;

    constructor(floor, section, row, string, number, type) {
        this.floor = floor;
        this.section = section;
        this.row = row;
        this.string = string;
        this.number = number;
        this.type = type;
    }
}

export default Seat;

const seatTypes = {
    noneClass: 0,
    economClass: 1,
    businesClass: 2,
    firstClass: 3
}

/******************************************************************************************/

const airplanes = [
    {
        id: 1, name:'F300', maxMass: 1000, seats: [
            new Seat(1, 1, 1, 1, 1, seatTypes.economClass), new Seat(1, 1, 1, 1, 2, seatTypes.economClass),
            new Seat(1, 1, 2, 1, 1, seatTypes.economClass), new Seat(1, 1, 2, 2, 1, seatTypes.economClass),

            new Seat(1, 2, 1, 1, 1, seatTypes.businesClass), new Seat(1, 2, 1, 2, 1, seatTypes.businesClass),
            new Seat(1, 2, 2, 1, 1, seatTypes.businesClass), new Seat(1, 2, 2, 1, 2, seatTypes.businesClass), new Seat(1, 2, 2, 1, 3, seatTypes.businesClass),
            new Seat(1, 2, 2, 2, 2, seatTypes.businesClass),

            new Seat(1, 3, 1, 1, 1, seatTypes.businesClass), new Seat(1, 3, 1, 1, 2, seatTypes.businesClass), new Seat(1, 3, 1, 1, 3, seatTypes.businesClass),
            new Seat(1, 3, 1, 2, 1, seatTypes.businesClass), new Seat(1, 3, 1, 2, 2, seatTypes.businesClass),
            new Seat(1, 3, 1, 3, 1, seatTypes.businesClass),

            new Seat(1, 3, 2, 1, 1, seatTypes.businesClass), new Seat(1, 3, 2, 1, 2, seatTypes.businesClass), new Seat(1, 3, 2, 1, 3, seatTypes.businesClass),
            new Seat(1, 3, 2, 2, 1, seatTypes.businesClass), new Seat(1, 3, 2, 2, 2, seatTypes.businesClass),

            new Seat(1, 3, 3, 1, 1, seatTypes.businesClass), new Seat(1, 3, 3, 2, 1, seatTypes.businesClass),

            new Seat(2, 1, 3, 1, 1, seatTypes.businesClass), new Seat(2, 1, 3, 2, 1, seatTypes.businesClass)
        ]
    },
    {
        id: 2, name:'Keksik', maxMass: 500, seats: [
            new Seat(1, 1, 1, 1, 1, seatTypes.economClass),
            new Seat(1, 1, 1, 2, 1, seatTypes.economClass), new Seat(1, 1, 1, 2, 3, seatTypes.economClass)
        ]
    }
];

export function getAll () {
    return new Promise (
        (resolve, reject) => {
            const data = airplanes;
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
    return new Promise((resolve, reject) => {
        const storage = airplanes;
        const item = () => {
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
    });
}