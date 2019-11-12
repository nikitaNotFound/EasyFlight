class SearchOptions {
    fromAirportId;
    toAirportId;
    fromCityId;
    toCityId;
    departureDate;
    arrivalDate;
    ticketCount;
    searchBack;

    constructor(fromAirportId, toAirportId, fromCityId, toCityId, departureDate, arrivalDate, ticketCount, searchBack) {
        this.fromAirportId = fromAirportId;
        this.toAirportId = toAirportId;
        this.fromCityId = fromCityId;
        this.toCityId = toCityId;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.searchBack = searchBack;
        this.ticketCount = ticketCount;
    }
}

export default SearchOptions;