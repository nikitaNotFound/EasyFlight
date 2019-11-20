class SearchOptions {
    nameFilter;
    carryingMaxKg;
    carryingMinKg;
    seatCountMax;
    seatCountMin;
    currentPage;
    pageLimit;

    constructor(nameFilter, carryingMaxKg, carryingMinKg, seatCountMax, seatCountMin, currentPage = null, pageLimit = null) {
        this.nameFilter = nameFilter;
        this.carryingMaxKg = carryingMaxKg;
        this.carryingMinKg = carryingMinKg;
        this.seatCountMax = seatCountMax;
        this.seatCountMin = seatCountMin;
        this.currentPage = currentPage;
        this.pageLimit = pageLimit;
    }
}

export default SearchOptions;