class Seat {
    floor;
    section;
    row;
    string;
    number;
    typeId;

    constructor(floor, section, row, string, number, typeId) {
        this.floor = floor;
        this.section = section;
        this.row = row;
        this.string = string;
        this.number = number;
        this.typeId = typeId;
    }
}

export default Seat;