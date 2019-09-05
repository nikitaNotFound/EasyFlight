class Flight {
     id;
     fromId;
     toId;
     departureTime;
     departureBackTime;
     desc;
     airplaneId;

     constructor (id, fromId, toId, departureTime, departureBackTime, desc, airplaneId) {
         this.id = id;
         this.fromId = fromId;
         this.toId = toId;
         this.departureTime = departureTime;
         this.departureBackTime = departureBackTime;
         this.desc = desc;
         this.airplaneId = airplaneId;
     }
}

export default Flight;