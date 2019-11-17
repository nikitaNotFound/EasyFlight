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

    constructor(fromAirportId, toAirportId, fromCityId, toCityId, departureDate, arrivalDate, ticketCount, searchBack, currentPage = null, pageLimit = null) {
        this.fromAirportId = fromAirportId;
        this.toAirportId = toAirportId;
        this.fromCityId = fromCityId;
        this.toCityId = toCityId;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.searchBack = searchBack;
        this.ticketCount = ticketCount;
        this.currentPage = currentPage;
        this.pageLimit = pageLimit;
    }
}