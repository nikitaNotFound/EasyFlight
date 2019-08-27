class Airplane {
    id;
    name;
    maxMass;
    seats;
    seatTypes;

    constructor (id, name, maxMass, seats, seatTypes) {
        this.id = id;
        this.name = name;
        this.maxMass = maxMass;
        this.seats = seats;
        this.seatTypes = seatTypes;
    }
}

export default Airplane;