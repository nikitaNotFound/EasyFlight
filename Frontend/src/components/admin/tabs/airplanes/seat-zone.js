import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import SeatRow from './seat-row';

function inizializeRowSeats(props, maxLength) {
    let storage = props.seats.slice();

    for (let i = 0, len = storage.length; i < len; i++) {
        // checks empty rows
        if (!storage[i]) {
            storage[i] = [];
        }

        storage[i].length = maxLength;
    }

    let lowerRow = [];
    lowerRow.length = maxLength;
    storage.push(lowerRow);

    return storage;
}

function getGlobalRowLength(props) {
    let storage = props.seats.slice();

    let maxLength = storage.reduce(
        (length, seatRow) =>
            length < seatRow.length
                ? seatRow.length
                : length,
        0
    );
    maxLength++;
    return maxLength;
}

function SeatZone(props) {
    const [globalRowLength, changeGlobalRowLength] = useState(getGlobalRowLength(props));
    const [zoneSeats, changeZoneSeats] = useState(inizializeRowSeats(props, globalRowLength));

    function onSeatDeleted(seatPosition) {
        let zoneArray = zoneSeats.slice();

        zoneArray[seatPosition.row - 1][seatPosition.number - 1] = null;

        while (checkRowEmpty(zoneArray[zoneArray.length - 1])
            && checkRowEmpty(zoneArray[zoneArray.length - 2])
        ) {
            zoneArray = zoneArray.slice(0, zoneArray.length - 1);
        }

        if (checkColumnEmpty(zoneArray, globalRowLength - 1)
        && checkColumnEmpty(zoneArray, globalRowLength - 2)
        ) {
            // i need this because change hook cant update value at time
            let localGlobalRowLength = globalRowLength;
            while (checkColumnEmpty(zoneArray, localGlobalRowLength - 1)
                && checkColumnEmpty(zoneArray, localGlobalRowLength - 2)
            ) {
                for (let i = 0, len = zoneArray.length; i < len; i++) {
                    zoneArray[i] = zoneArray[i].slice(0, zoneArray[i].length - 1);
                }
                localGlobalRowLength--;
            }
            changeGlobalRowLength(localGlobalRowLength);
        }

        changeZoneSeats(zoneArray);
        props.onZoneChange(seatPosition.floor, seatPosition.section, seatPosition.zone, zoneArray);
    }
    
    function onSeatAdded(seat) {
        let storage = zoneSeats.slice();
        
        storage[seat.row - 1][seat.number - 1] = seat;
        
        if (!checkColumnEmpty(storage, globalRowLength - 1)) {
            for (let i = 0, len = storage.length; i < len; i++) {
                storage[i].length = globalRowLength + 1;
            }
            changeGlobalRowLength(globalRowLength + 1);
        }
        
        if (!checkRowEmpty(storage[storage.length - 1])) {
            let lowerRow = [];
            lowerRow.length = storage[storage.length - 1].length;
            storage.push(lowerRow);
        }
        
        changeZoneSeats(storage);
        props.onZoneChange(seat.floor, seat.section, seat.zone, storage);
    }

    function onSeatChanged(seatType, seatPosition) {
        let storage = zoneSeats.slice();

        storage[seatPosition.row - 1][seatPosition.number - 1].typeId = seatType;

        changeZoneSeats(storage);
        props.onZoneChange(seatPosition.floor, seatPosition.section, seatPosition.zone, storage);
    }
    
    function checkColumnEmpty(array, columnIndex) {
        for (let i = 0, len = array.length; i < len; i++) {
            const rowElement = array[i];
            
            if (rowElement[columnIndex]) {
                return false;
            }
        }

        return true;
    }

    function checkRowEmpty(row) {
        for (let i = 0, len = row.length; i < len; i++) {
            const element = row[i];

            if (element) {
                return false;
            }
        }

        return true;
    }

    return (
        <div className="airplane-zone">
            <div className="zone-headline">
                {props.placeInfo.zone}
                <div className="zone-name">
                    zone
                </div>
            </div>
            {zoneSeats.map(
                (seats, index) => {
                    let placeInfo = {};
                    Object.assign(placeInfo, props.placeInfo);
                    placeInfo.row = index + 1;
                    return (
                        <SeatRow 
                            key={index}
                            seats={seats}
                            seatTypes={props.seatTypes}
                            onSeatAdded={onSeatAdded}
                            onSeatChanged={onSeatChanged}
                            onSeatDeleted={onSeatDeleted}
                            placeInfo={placeInfo}
                        />
                    );
                }
            )}
        </div>
    );
}

SeatZone.propsTypes = {
    seats: PropsTypes.array,
    placeInfo: PropsTypes.object,
    seatTypes: PropsTypes.array,
    onZoneChange: PropsTypes.func
}

export default SeatZone;