export default class BaggageCost {
    flightId;
    costPerKg;

    constructor (flightId, costPerKg) {
        this.flightId = flightId;
        this.costPerKg = costPerKg;
    }
}