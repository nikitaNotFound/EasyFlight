import Seat from './airplane-models/seat';
import SeatType from './airplane-models/seat-type';
import Airplane from './airplane-models/airplane';

const airplanes = [
    //airplane constructor params: id, name, maxMass, seats, seatTypes
    new Airplane(
        1, 'F300', 1000, 
        [
            new Seat(1, 1, 1, 1, 1, 0), new Seat(1, 1, 1, 1, 2, 0),
            new Seat(1, 1, 2, 1, 1, 0), new Seat(1, 1, 2, 2, 1, 0),

            new Seat(1, 2, 1, 1, 1, 0), new Seat(1, 2, 1, 2, 1, 0),
            new Seat(1, 2, 2, 1, 1, 0), new Seat(1, 2, 2, 1, 2, 0), new Seat(1, 2, 2, 1, 3, 0),
            new Seat(1, 2, 2, 2, 2, 0),

            new Seat(1, 3, 1, 1, 1, 0), new Seat(1, 3, 1, 1, 2, 0), new Seat(1, 3, 1, 1, 3, 0),
            new Seat(1, 3, 1, 2, 1, 0), new Seat(1, 3, 1, 2, 2, 0),
            new Seat(1, 3, 1, 3, 1, 0),

            new Seat(1, 3, 2, 1, 1, 0), new Seat(1, 3, 2, 1, 2, 0), new Seat(1, 3, 2, 1, 3, 0),
            new Seat(1, 3, 2, 2, 1, 0), new Seat(1, 3, 2, 2, 2, 0),

            new Seat(1, 3, 3, 1, 1, 0), new Seat(1, 3, 3, 2, 1, 0),

            new Seat(2, 1, 3, 1, 1, 0), new Seat(2, 1, 3, 2, 1, 0)
        ],
        [
            new SeatType(1, 'econom', 'rgb(89, 167, 79)'),
            new SeatType(2, 'busines', 'rgb(179, 177, 70)'),
            new SeatType(3, 'first class', 'rgb(173, 68, 68)')
        ]
    ),
    new Airplane(
        2, 'Keksik', 500,
        [
            new Seat(1, 1, 1, 1, 1, 0),
            new Seat(1, 1, 1, 2, 1, 0), new Seat(1, 1, 1, 2, 3, 0)
        ],
        [
            new SeatType(1, 'econom', 'rgb(89, 167, 79)'),
            new SeatType(2, 'busines', 'rgb(179, 177, 70)'),
            new SeatType(3, 'first class', 'rgb(173, 68, 68)')
        ]
    )
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