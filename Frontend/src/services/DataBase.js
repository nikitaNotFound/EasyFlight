import Flight from './flight-models/flight';
import User from '../services/user-models/user';
import UserFlight from '../services/user-models/user-flight';
import Seat from '../services/airplane-models/seat'
import SeatType from './airplane-models/seat-type';
import Airplane from './airplane-models/airplane';
import Airport from './airport-models/airport';
import TicketCost from './flight-models/ticket-cost';
import City from '../services/place-models/city';
import Country from '../services/place-models/country';

export const flights = [
    new Flight(1, 2, 3, '2018-01-01 18:30', 'This is a test flight.', 1, 20, 10, 2, 8, 1),
    new Flight(2, 4, 1, '2018-02-01 12:30', 'This is not a test flight.', 2, 5, 20, 3, 10, 1),
    new Flight(3, 1, 4, '2018-02-01 12:30', 'This is not a test flight.', 1, 20, 10, 4, 5, 2),
    new Flight(4, 3, 2, '2018-02-01 12:30', 'This is not a test flight.', 2, 5, 5, 2, 1, 10),
    new Flight(5, 1, 4, '2018-02-01 12:30', 'This is not a test flight.', 1, 20, 10, 1, 30, 1),
];

export const ticketsCost = [
    new TicketCost(1, 1, 100), new TicketCost(1, 2, 200), new TicketCost(1, 3, 300),
    new TicketCost(2, 1, 250), new TicketCost(2, 2, 600), new TicketCost(2, 3, 1000),
    new TicketCost(3, 1, 100), new TicketCost(3, 2, 200), new TicketCost(3, 3, 300),
    new TicketCost(4, 1, 250), new TicketCost(4, 2, 600), new TicketCost(4, 3, 1000),
    new TicketCost(5, 1, 100), new TicketCost(5, 2, 200), new TicketCost(5, 3, 300)
];

export const users = [
    new User(1, 'Nikita', '123@123.com', '123', '')
];

export const userFlights = [
    new UserFlight(1, 1, '200$', new Seat(1, 1, 1, 1, 1, 0))
];

export const airports = [
    new Airport(1, 'Minsk airport', 1, 'Biggest airport in Belarus'),
    new Airport(2, 'Kiev airport', 3, 'Biggest airport in Ukraine'),
    new Airport(3, 'Paris airport', 5, 'Biggest airport in France'),
    new Airport(4, 'Brest airport', 4, '')
];

export const cities = [
    new City(1, 1, 'Minsk'), new City(2, 1, 'Brest'),
    new City(3, 2, 'Kiev'),
    new City(4, 3, 'Brest'), new City(5, 3, 'Paris')
];

export const countries = [
    new Country(1, 'Belarus'), new Country(2, 'Ukraine'), new Country(3, 'France')
]

export const airplanes = [
    //airplane constructor params: id, name, carrying, seats, seatTypes
    new Airplane(
        1, 'F300', 1000,
        [
            new Seat(1, 1, 1, 1, 1, 1, 1, 1), new Seat(2, 1, 1, 1, 1, 1, 2, 1),
            new Seat(3, 1, 1, 1, 2, 1, 1, 1), new Seat(4, 1, 1, 1, 2, 2, 1, 1),

            new Seat(5, 1, 1, 2, 1, 1, 1, 1), new Seat(6, 1, 1, 2, 1, 2, 1, 1),
            new Seat(7, 1, 1, 2, 2, 1, 1, 1), new Seat(8, 1, 1, 2, 2, 1, 2, 1), new Seat(9, 1, 1, 2, 2, 1, 3, 1),
            new Seat(10, 1, 1, 2, 2, 2, 2, 1),

            new Seat(11, 1, 1, 3, 1, 1, 1, 1), new Seat(12, 1, 1, 3, 1, 1, 2, 1), new Seat(13, 1, 1, 3, 1, 1, 3, 1),
            new Seat(14, 1, 1, 3, 1, 2, 1, 1), new Seat(15, 1, 1, 3, 1, 2, 2, 1),
            new Seat(16, 1, 1, 3, 1, 3, 1, 1),

            new Seat(17, 1, 1, 3, 2, 1, 1, 1), new Seat(18, 1, 1, 3, 2, 1, 2, 1), new Seat(19, 1, 1, 3, 2, 1, 3, 1),
            new Seat(20, 1, 1, 3, 2, 2, 1, 1), new Seat(21, 1, 1, 3, 2, 2, 2, 1),

            new Seat(22, 1, 1, 3, 3, 1, 1, 1), new Seat(23, 1, 1, 3, 3, 2, 1, 1),

            new Seat(24, 1, 2, 1, 1, 1, 1, 1), new Seat(25, 1, 2, 1, 1, 2, 1, 1)
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
            new Seat(26, 2, 1, 1, 1, 1, 1, 1),
            new Seat(27, 2, 1, 1, 1, 2, 1, 1), new Seat(28, 2, 1, 1, 1, 2, 3, 1)
        ],
        [
            new SeatType(1, 'econom', 'rgb(89, 167, 79)'),
            new SeatType(2, 'busines', 'rgb(179, 177, 70)'),
            new SeatType(3, 'first class', 'rgb(173, 68, 68)')
        ]
    )
];