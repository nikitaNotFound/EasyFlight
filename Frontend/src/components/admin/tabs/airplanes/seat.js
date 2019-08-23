import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';
import SeatObject from '../../../../services/airplane-models/seat';

function Seat (props) {
    const [seatType, changeSeatType] = useState();

    useEffect(() => {
        if (props.seat === undefined || props.seat.type == 0) {
            changeSeatType(0);
        }
        else {
            changeSeatType(props.seat.type);
        }
    }, []);

    function onClickHandler () {
        const oldType = seatType;
        const newType = seatType + 1 > 3
            ? 0
            : seatType + 1;
        changeSeatType(newType);

        if (newType == 0) {
            const seatPosition = {
                string: props.placeInfo.string,
                number: props.placeInfo.number
            };

            props.onSeatDeleted(seatPosition);
        }
        else if (newType > 0 && oldType == 0) {
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

    return (
        <div className={`seat seat-type-${seatType} non-selectable`} onClick={onClickHandler}></div>
    );
}

Seat.PropsTypes = {
    seat: PropsTypes.object,
    placeInfo: PropsTypes.object,
    onSeatAdded: PropsTypes.func,
    onSeatChanged: PropsTypes.func,
    onSeatDeleted: PropsTypes.func
}

export default Seat;