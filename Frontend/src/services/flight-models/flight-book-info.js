export default class FlightBookInfo {
    flightId;
    suitcaseOverloadCost;
    handLuggageOverloadCost;
    seatBooks;

    constructor(flightId, suitcaseOverloadCost, handLuggageOverloadCost, seatBooks) {
        this.flightId = flightId;
        this.suitcaseOverloadCost = suitcaseOverloadCost;
        this.handLuggageOverloadCost = handLuggageOverloadCost;
        this.seatBooks = seatBooks;
    }
}