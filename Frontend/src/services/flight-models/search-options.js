class SearchOptions {
    fromAirportId;
    toAirportId;
    fromCityId;
    toCityId;
    departureDate;
    arrivalDate;
    ticketCount;
    searchBack;

    constructor(fromAirport, toAirport, fromCity, toCity, departureDate, arrivalDate, ticketCount, searchBack) {
        this.fromAirportId = fromAirport;
        this.toAirportId = toAirport;
        this.fromCityId = fromCity;
        this.toCityId = toCity;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.searchBack = searchBack;
        this.ticketCount = ticketCount;
    }
}

export default SearchOptions;