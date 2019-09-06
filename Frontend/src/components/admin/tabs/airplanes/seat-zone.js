import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SeatRow from './seat-row';

function inizializeRowSeats(props, maxLength) {
    let storage = [];
    Object.assign(storage, props.seats)

    for (let i = 0, len = storage.length; i < len; i++) {
        storage[i].length = maxLength;
    }

    let lowerRow = [];
    lowerRow.length = maxLength;
    storage.push(lowerRow);

    return storage;
}

function getGlobalRowLength(props) {
    let storage = [];
    Object.assign(storage, props.seats)

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
    const [rowSeats, changeRowSeats] = useState(inizializeRowSeats(props, globalRowLength));

    function onSeatDeleted(seatPosition) {
        let storage = [];
        Object.assign(storage, rowSeats);

        storage[seatPosition.row - 1][seatPosition.number - 1] = null;

        if (checkRowEmpty(storage[storage.length - 1]) && checkRowEmpty(storage[storage.length - 2])) {
            storage = storage.slice(0, storage.length - 1);
        }

        if (checkColumnEmpty(storage, globalRowLength - 1) && checkColumnEmpty(storage, globalRowLength - 2)) {
            for (let i = 0, len = storage.length; i < len; i++) {
                storage[i] = storage[i].slice(0, storage[i].length - 1);
            }
            changeGlobalRowLength(globalRowLength - 1);
        }

        changeRowSeats(storage);
    }
    
    function onSeatAdded(seat) {
        let storage = [];
        Object.assign(storage, rowSeats);

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

        changeRowSeats(storage);
    }

    function onSeatChanged(seatType, placeInfo) {
        let storage = [];
        Object.assign(storage, rowSeats);

        storage[placeInfo.row - 1][placeInfo.number - 1].typeId = seatType;
        
        changeRowSeats(storage);
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
            {rowSeats.map(
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
                            placeInfo={placeInfo}/>
                    );
                }
            )}
        </div>
    );
}

SeatZone.propsTypes = {
    seats: PropsTypes.array,
    placeInfo: PropsTypes.object,
    seatTypes: PropsTypes.array
}

export default SeatZone;