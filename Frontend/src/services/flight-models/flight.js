class Flight {
     id;
     fromId;
     toId;
     departureTime;
     departureDate;
     desc;
     airplaneId;
     ticketsLeft;
     suitcaseMass;
     suitcaseCount;
     carryonMass;
     carryonCount;

     constructor (id, fromId, toId, departureTime, departureDate, desc, airplaneId, ticketsLeft, suitcaseMass, suitcaseCount, carryonMass, carryonCount) {
         this.id = id;
         this.fromId = fromId;
         this.toId = toId;
         this.departureTime = departureTime;
         this.departureDate = departureDate;
         this.desc = desc;
         this.airplaneId = airplaneId;
         this.ticketsLeft = ticketsLeft;
         this.suitcaseMass = suitcaseMass;
         this.suitcaseCount = suitcaseCount;
         this.carryonMass = carryonMass;
         this.carryonCount = carryonCount;
     }
}

export default Flight;