export function getAll () {
    const sitsTypes = {
        economClass: 0,
        businesClass: 1,
        firstClass: 2
    }

    return [
        {name:"F300", rows:2, maxMass: 1000, sitsInfo:[
            [sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass],
            [sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass, sitsTypes.economClass]
        ]},
        {name:"Keksik", rows:1, maxMass: 500, sitsInfo:[
            [sitsTypes.firstClass, sitsTypes.firstClass, sitsTypes.firstClass, sitsTypes.businesClass]
        ]}
    ];
}