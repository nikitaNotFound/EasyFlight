export default class Flight {
     id;
     fromId;
     toId;
     departureTimeDate;
     arrivalTimeDate;
     airplaneId;
     ticketsLeft;
     suitcaseMass;
     suitcaseCount;
     carryonMass;
     carryonCount;

     constructor (id, fromId, toId, departureTimeDate, arrivalTimeDate, airplaneId, ticketsLeft, suitcaseMass, suitcaseCount, carryonMass, carryonCount) {
         this.id = id;
         this.fromId = fromId;
         this.toId = toId;
         this.departureTimeDate = departureTimeDate;
         this.arrivalTimeDate = arrivalTimeDate;
         this.airplaneId = airplaneId;
         this.ticketsLeft = ticketsLeft;
         this.suitcaseMass = suitcaseMass;
         this.suitcaseCount = suitcaseCount;
         this.carryonMass = carryonMass;
         this.carryonCount = carryonCount;
     }
}