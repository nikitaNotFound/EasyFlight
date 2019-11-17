class SearchOptions {
    name;
    carryingMaxKg;
    carryingMinKg;
    seatCountMax;
    seatCountMin;
    currentPage;
    pageLimit;

    constructor(name, carryingMaxKg, carryingMinKg, seatCountMax, seatCountMin, currentPage = null, pageLimit = null) {
        this.name = name;
        this.carryingMaxKg = carryingMaxKg;
        this.carryingMinKg = carryingMinKg;
        this.seatCountMax = seatCountMax;
        this.seatCountMin = seatCountMin;
        this.currentPage = currentPage;
        this.pageLimit = pageLimit;
    }
}

export default SearchOptions;