export default class Flight {
     id;
     fromAirportId;
     toAirportId;
     departureTime;
     arrivalTime;
     airplaneId;
     suitcaseMassKg;
     suitcaseCount;
     carryonMassKg;
     carryonCount;
     massOverloadKgCost;

     constructor (id, fromAirportId, toAirportId, departureTime, arrivalTime, airplaneId, suitcaseMassKg, suitcaseCount, carryonMassKg, carryonCount, massOverloadKgCost) {
         this.id = id;
         this.fromAirportId = fromAirportId;
         this.toAirportId = toAirportId;
         this.departureTime = departureTime;
         this.arrivalTime = arrivalTime;
         this.airplaneId = airplaneId;
         this.suitcaseMassKg = suitcaseMassKg;
         this.suitcaseCount = suitcaseCount;
         this.carryonMassKg = carryonMassKg;
         this.carryonCount = carryonCount;
         this.massOverloadKgCost = massOverloadKgCost;
     }
}