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