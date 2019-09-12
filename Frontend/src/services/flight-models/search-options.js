class SearchOptions {
    fromAirport;
    toAirport;
    fromCity;
    toCity;
    departureDate;
    departureBackDate;
    ticketCount;
    searchToAndBack;
    fromCountry;
    toCountry;

    constructor(fromAirport, toAirport, fromCity, toCity, departureDate, departureBackDate, ticketCount, searchToAndBack, fromCountry, toCountry) {
        this.fromAirport = fromAirport;
        this.toAirport = toAirport;
        this.fromCity = fromCity;
        this.toCity = toCity;
        this.departureDate = departureDate;
        this.departureBackDate = departureBackDate;
        this.ticketCount = ticketCount;
        this.searchToAndBack = searchToAndBack;
        this.fromCountry = fromCountry;
        this.toCountry = toCountry;
    }
}

export default SearchOptions;