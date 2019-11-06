class SearchOptions {
    nameFilter;
    fromAirportId;
    toAirportId;
    fromCityId;
    toCityId;
    departureTime;
    arrivalTime;
    ticketCount;
    searchBack;

    constructor(nameFilter, fromAirport, toAirport, fromCity, toCity, departureTime, arrivalTime, ticketCount, searchBack) {
        this.nameFilter = nameFilter;
        this.fromAirportId = fromAirport;
        this.toAirportId = toAirport;
        this.fromCityId = fromCity;
        this.toCityId = toCity;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.searchBack = searchBack;
        this.ticketCount = ticketCount;
    }
}

export default SearchOptions;