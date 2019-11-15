export default class BookCostInfo {
    suitcaseOverloadCost;
    handLuggageOverloadCost;
    ticketsCost;
    totalCost;
    seatsCost;

    constructor (suitcaseOverloadCost, handLuggageOverloadCost, ticketsCost, totalCost, seatsCost) {
        this.suitcaseOverloadCost = suitcaseOverloadCost;
        this.handLuggageOverloadCost = handLuggageOverloadCost;
        this.ticketsCost = ticketsCost;
        this.totalCost = totalCost;
        this.seatsCost = seatsCost;
    }
}