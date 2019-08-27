import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SeatString from './seat-string';

function inizializeStringSeats (props, maxLength) {
    let storage = [];
    Object.assign(storage, props.seats)

    for (let i = 0, len = storage.length; i < len; i++) {
        storage[i].length = maxLength;
    }

    let lowerString = [];
    lowerString.length = maxLength;
    storage.push(lowerString);

    return storage;
}

function inizializeGlobalStringLength (props) {
    let storage = [];
    Object.assign(storage, props.seats)

    let maxLength = 0;
    for (let i = 0, len = storage.length; i < len; i++) {
        const element = storage[i];

        if (element.length > maxLength) {
            maxLength = element.length;
        }
    }
    maxLength++;

    return maxLength;
}

function SeatRow (props) {
    const [globalStringLength, changeGlobalStringLength] = useState(inizializeGlobalStringLength(props));
    const [stringSeats, changeStringSeats] = useState(inizializeStringSeats(props, globalStringLength));

    function onSeatDeleted (seatPosition) {
        let storage = [];
        Object.assign(storage, stringSeats);

        storage[seatPosition.string - 1][seatPosition.number - 1] = undefined;

        if (isStringEmpty(storage[storage.length - 1]) && isStringEmpty(storage[storage.length - 2])) {
            storage = storage.slice(0, storage.length - 1);
        }

        if (isColumnEmpty(storage, globalStringLength - 1) && isColumnEmpty(storage, globalStringLength - 2)) {
            for (let i = 0, len = storage.length; i < len; i++) {
                storage[i] = storage[i].slice(0, storage[i].length - 1);
            }
            changeGlobalStringLength(globalStringLength - 1);
        }

        changeStringSeats(storage);
    }
    
    function onSeatAdded (seat) {
        let storage = [];
        Object.assign(storage, stringSeats);

        storage[seat.string - 1][seat.number - 1] = seat;
        
        if (!isColumnEmpty(storage, globalStringLength - 1)) {
            for (let i = 0, len = storage.length; i < len; i++) {
                storage[i].length = globalStringLength + 1;
            }
            changeGlobalStringLength(globalStringLength + 1);
        }
        
        if (!isStringEmpty(storage[storage.length - 1])) {
            let lowerString = [];
            lowerString.length = storage[storage.length - 1].length;
            storage.push(lowerString);
        }

        changeStringSeats(storage);
    }

    function onSeatChanged (seatType, placeInfo) {
        let storage = [];
        Object.assign(storage, stringSeats);

        storage[placeInfo.string - 1][placeInfo.number - 1].typeId = seatType;
        
        changeStringSeats(storage);
    }
    
    function isColumnEmpty (array, columnIndex) {
        for (let i = 0, len = array.length; i < len; i++) {
            const stringElement = array[i];
            if (stringElement[columnIndex] !== undefined) {
                return false;
            }
        }

        return true;
    }

    function isStringEmpty (string) {
        for (let i = 0, len = string.length; i < len; i++) {
            const element = string[i];

            if (element !== undefined) {
                return false;
            }
        }

        return true;
    }

    return (
        <div className="airplane-row">
            {stringSeats.map(
                (item, index) => {
                    let placeInfo = {};
                    Object.assign(placeInfo, props.placeInfo);
                    placeInfo.string = index + 1;
                    return (
                        <SeatString 
                            key={index}
                            seats={item}
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

SeatRow.propsTypes = {
    seats: PropsTypes.array,
    placeInfo: PropsTypes.object,
    seatTypes: PropsTypes.array
}

export default SeatRow;