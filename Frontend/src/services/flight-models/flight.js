class Flight {
     id;
     fromId;
     toId;
     departureTime;
     departureBackTime;
     desc;
     airplaneId;
     ticketsLeft;

     constructor (id, fromId, toId, departureTime, departureBackTime, desc, airplaneId, ticketsLeft) {
         this.id = id;
         this.fromId = fromId;
         this.toId = toId;
         this.departureTime = departureTime;
         this.departureBackTime = departureBackTime;
         this.desc = desc;
         this.airplaneId = airplaneId;
         this.ticketsLeft = ticketsLeft;
     }
}

export default Flight;