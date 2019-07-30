export function getAll () {
    const sitsTypes = {
        economClass: 0,
        businesClass: 1,
        firstClass: 2
    }

    return [
        {name:"F300", xSize:2, ySize:6, rows:2, maxMass: 1000, sitsInfo:[
            [sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass],
            [sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass]
        ]},
        {name:"Keksik", xSize:1, ySize:4, rows:1, maxMass: 500, sitsInfo:[
            [sitsTypes.firstClass, sitsTypes.firstClass, sitsTypes.firstClass, sitsTypes.businesClass]
        ]}
    ];
}