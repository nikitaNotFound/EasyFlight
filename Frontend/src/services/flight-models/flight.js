class Flight {
     id;
     from;
     to;
     departureTime;
     departureBackTime;
     desc;
     airplane;

     constructor (id, from, to, departureTime, departureBackTime, desc, airplane) {
         this.id = id;
         this.from = from;
         this.to = to;
         this.departureTime = departureTime;
         this.departureBackTime = departureBackTime;
         this.desc = desc;
         this.airplane = airplane;
     }
}

export default Flight;