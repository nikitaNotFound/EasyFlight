class Airplane {
    id;
    name;
    carrying;
    seats;
    seatTypes;

    constructor (id, name, carrying, seats, seatTypes) {
        this.id = id;
        this.name = name;
        this.carrying = carrying;
        this.seats = seats;
        this.seatTypes = seatTypes;
    }
}

export default Airplane;