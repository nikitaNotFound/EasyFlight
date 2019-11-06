class SearchOptions {
    name;
    carryingMaxKg;
    carryingMinKg;
    seatCountMax;
    seatCountMin;

    constructor(name, carryingMaxKg, carryingMinKg, seatCountMax, seatCountMin) {
        this.name = name;
        this.carryingMaxKg = carryingMaxKg;
        this.carryingMinKg = carryingMinKg;
        this.seatCountMax = seatCountMax;
        this.seatCountMin = seatCountMin;
    }
}

export default SearchOptions;