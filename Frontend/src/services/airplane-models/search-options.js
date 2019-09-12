class SearchOptions {
    name;
    carryingMax;
    carryingMin;
    seatCountMax;
    seatCountMin;

    constructor(name, carryingMax, carryingMin, seatCountMax, seatCountMin) {
        this.name = name;
        this.carryingMax = carryingMax;
        this.carryingMin = carryingMin;
        this.seatCountMax = seatCountMax;
        this.seatCountMin = seatCountMin;
    }
}

export default SearchOptions;