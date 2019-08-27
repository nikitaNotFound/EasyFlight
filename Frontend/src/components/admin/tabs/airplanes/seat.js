import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SeatObject from '../../../../services/airplane-models/seat';

function inizializeSeatType (props) {
    if (props.seat === undefined) {
        return undefined;
    }
    else {
        return props.seat.typeId;
    }
}

function Seat (props) {
    const [seatType, changeSeatType] = useState(inizializeSeatType(props));

    function onClickHandler () {
        const oldType = seatType === undefined
            ? -1
            : seatType;

        const newType = oldType + 1;

        changeSeatType(newType);

        if (newType > props.seatTypes.length - 1) {
            const seatPosition = {
                string: props.placeInfo.string,
                number: props.placeInfo.number
            };
            changeSeatType(undefined);
            props.onSeatDeleted(seatPosition);
        }
        else if (oldType == -1 && newType == 0) {
            const newSeat = new SeatObject (
                props.placeInfo.floor,
                props.placeInfo.section,
                props.placeInfo.row,
                props.placeInfo.string,
                props.placeInfo.number,
                seatType
            );

            props.onSeatAdded(newSeat);
        }
        else {
            props.onSeatChanged(newType, props.placeInfo);
        }
    }
    if (seatType === undefined) {
        return (
            <div className={`seat seat-type-0 non-selectable`}
                onClick={onClickHandler}/>
        );
    }
    
    return (
        <div className={`seat non-selectable`}
            style={{background:props.seatTypes[seatType].color}}
            onClick={onClickHandler}/>
    );
}

Seat.PropsTypes = {
    seat: PropsTypes.object,
    seatTypes: PropsTypes.array,
    placeInfo: PropsTypes.object,
    onSeatAdded: PropsTypes.func,
    onSeatChanged: PropsTypes.func,
    onSeatDeleted: PropsTypes.func
}

export default Seat;