export default class SearchOptions {
    fromAirportId;
    toAirportId;
    fromCityId;
    toCityId;
    departureDate;
    arrivalDate;
    ticketCount;
    searchBack;
    currentPage;
    pageLimit;
    departureBackDate;
    arrivalBackDate;

    constructor(fromAirportId, toAirportId, fromCityId, toCityId, departureDate, arrivalDate, ticketCount, searchBack, departureBackDate, arrivalBackDate, currentPage = null, pageLimit = null) {
        this.fromAirportId = fromAirportId;
        this.toAirportId = toAirportId;
        this.fromCityId = fromCityId;
        this.toCityId = toCityId;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.searchBack = searchBack;
        this.ticketCount = ticketCount;
        this.departureBackDate =departureBackDate;
        this.arrivalBackDate = arrivalBackDate;
        this.currentPage = currentPage;
        this.pageLimit = pageLimit;
    }
}