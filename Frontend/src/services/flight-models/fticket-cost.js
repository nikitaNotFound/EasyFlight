class TicketCost {
    flightId;
    seatTypeId;
    cost;

    constructor(flightId, seatTypeId, cost) {
        this.flightId = flightId;
        this.seatTypeId = seatTypeId;
        this.cost = cost;
    }
}

export default TicketCost;