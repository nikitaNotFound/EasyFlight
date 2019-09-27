class Seat {
    id;
    airplaneId;
    floor;
    section;
    zone;
    row;
    number;
    typeId;

    constructor(id, airplaneId, floor, section, zone, row, number, typeId) {
        this.id = id;
        this.airplaneId = airplaneId;
        this.floor = floor;
        this.section = section;
        this.zone = zone;
        this.row = row;
        this.number = number;
        this.typeId = typeId;
    }
}

export default Seat;