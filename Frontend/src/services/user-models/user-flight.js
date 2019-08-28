class UserFlight {
    userId;
    flightId;
    cost;
    seat;

    constructor (userId, flightId, cost, seat) {
        this.userId = userId;
        this.flightId = flightId;
        this.cost = cost;
        this.seat = seat;
    }
}

export default UserFlight;