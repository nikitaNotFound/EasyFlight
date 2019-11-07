export default class Flight {
     id;
     fromAirportId;
     toAirportId;
     departureTime;
     arrivalTime;
     airplaneId;
     suitcaseMassKg;
     suitcaseCount;
     handLuggageMassKg;
     handLuggageCount;
     massOverloadKgCost;

     constructor (id, fromAirportId, toAirportId, departureTime, arrivalTime, airplaneId, suitcaseMassKg, suitcaseCount, handLuggageMassKg, handLuggageCount, massOverloadKgCost) {
         this.id = id;
         this.fromAirportId = fromAirportId;
         this.toAirportId = toAirportId;
         this.departureTime = departureTime;
         this.arrivalTime = arrivalTime;
         this.airplaneId = airplaneId;
         this.suitcaseMassKg = suitcaseMassKg;
         this.suitcaseCount = suitcaseCount;
         this.carryonMassKg = handLuggageMassKg;
         this.handLuggageCount = handLuggageCount;
         this.massOverloadKgCost = massOverloadKgCost;
     }
}