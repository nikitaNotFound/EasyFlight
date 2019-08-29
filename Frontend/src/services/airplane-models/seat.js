class Seat {
    floor;
    section;
    zone;
    row;
    number;
    typeId;

    constructor(floor, section, zone, row, number, typeId) {
        this.floor = floor;
        this.section = section;
        this.zone = zone;
        this.row = row;
        this.number = number;
        this.typeId = typeId;
    }
}

export default Seat;