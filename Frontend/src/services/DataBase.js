import Flight from './flight-models/flight';
import User from '../services/user-models/user';
import UserFlight from '../services/user-models/user-flight';
import Seat from '../services/airplane-models/seat'
import SeatType from './airplane-models/seat-type';
import Airplane from './airplane-models/airplane';

export const flights = [
    new Flight(1, 'test1', 'test2', '2018-01-01T18:30:00.000Z', '2018-01-07T17:30:00.000Z', 'This is a test flight.', 'F300'),
    new Flight(2, 'test3', 'test4', '2018-02-01T12:30:00.000Z', '2018-02-07T17:30:00.000Z', 'This is not a test flight.', 'Keksik')
];

export const users = [
    new User(1, 'Nikita')
];

export const userFlights = [
    new UserFlight(1, 1, '200$', new Seat(1, 1, 1, 1, 1, 0))
];

export const airports = [
    {id: 1, name:"Minsk airport", country:"Belarus", city:"Minsk", desc:"Biggest airport in Belarus"},
    {id: 2, name:"Kiev airport", country:"Ukraine", city:"Kiev", desc:"Biggest airport in Ukraine"}
];

export const airplanes = [
    //airplane constructor params: id, name, maxMass, seats, seatTypes
    new Airplane(
        1, 'F300', 1000,
        [
            new Seat(1, 1, 1, 1, 1, 1), new Seat(1, 1, 1, 1, 2, 1),
            new Seat(1, 1, 2, 1, 1, 1), new Seat(1, 1, 2, 2, 1, 1),

            new Seat(1, 2, 1, 1, 1, 1), new Seat(1, 2, 1, 2, 1, 1),
            new Seat(1, 2, 2, 1, 1, 1), new Seat(1, 2, 2, 1, 2, 1), new Seat(1, 2, 2, 1, 3, 1),
            new Seat(1, 2, 2, 2, 2, 1),

            new Seat(1, 3, 1, 1, 1, 1), new Seat(1, 3, 1, 1, 2, 1), new Seat(1, 3, 1, 1, 3, 1),
            new Seat(1, 3, 1, 2, 1, 1), new Seat(1, 3, 1, 2, 2, 1),
            new Seat(1, 3, 1, 3, 1, 1),

            new Seat(1, 3, 2, 1, 1, 1), new Seat(1, 3, 2, 1, 2, 1), new Seat(1, 3, 2, 1, 3, 1),
            new Seat(1, 3, 2, 2, 1, 1), new Seat(1, 3, 2, 2, 2, 1),

            new Seat(1, 3, 3, 1, 1, 1), new Seat(1, 3, 3, 2, 1, 1),

            new Seat(2, 1, 3, 1, 1, 1), new Seat(2, 1, 3, 2, 1, 1)
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
            new Seat(1, 1, 1, 1, 1, 1),
            new Seat(1, 1, 1, 2, 1, 1), new Seat(1, 1, 1, 2, 3, 1)
        ],
        [
            new SeatType(1, 'econom', 'rgb(89, 167, 79)'),
            new SeatType(2, 'busines', 'rgb(179, 177, 70)'),
            new SeatType(3, 'first class', 'rgb(173, 68, 68)')
        ]
    )
];