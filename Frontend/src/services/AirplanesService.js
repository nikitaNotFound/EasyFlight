export function getAll () {
    const sitsTypes = {
        economClass: 0,
        businesClass: 1,
        firstClass: 2
    }

    return [
        {name:"F300", maxMass: 1000, sits:[
            new Sit(1, 1, 1, 1, sitsTypes.economClass), new Sit(1, 1, 1, 2, sitsTypes.economClass),
            new Sit(1, 1, 2, 1, sitsTypes.economClass), new Sit(1, 1, 2, 2, sitsTypes.economClass),
            new Sit(1, 2, 1, 1, sitsTypes.businesClass), new Sit(1, 2, 1, 2, sitsTypes.businesClass),
            new Sit(1, 2, 2, 1, sitsTypes.businesClass), new Sit(1, 2, 2, 2, sitsTypes.businesClass)
        ]},
        {name:"Keksik", maxMass: 500, sits:[
            new Sit(1, 1, 1, 1, sitsTypes.economClass), new Sit(1, 1, 1, 2, sitsTypes.economClass)
        ]}
    ];
}

class Sit {
    floor;
    section;
    row;
    number;
    type;

    constructor(floor, section, row, number, type) {
        this.floor = floor;
        this.section = section;
        this.row = row;
        this.number = number;
        this.type = type;
    }
}

export default Sit;