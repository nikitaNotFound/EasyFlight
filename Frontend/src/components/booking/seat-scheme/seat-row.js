import React from 'react';
import PropsTypes from 'prop-types';
import Seat from './seat';

function SeatRow(props) {
    for (let i = 0, len = props.seats.length; i < len; i++) {
        if (!props.seats[i]) {
            props.seats[i] = null;
        }
    }

    function seatChange(seat, index) {
        const storage = props.seats;
        storage[index] = seat;
        props.rowChange(storage, props.key);
    }

    return (
        <div className="airplane-string">
            {props.seats.map(
                (seats, index) => {
                    let placeInfo = {};
                    Object.assign(placeInfo, props.placeInfo);
                    placeInfo.number = index + 1;
                    return (
                        <Seat
                            key={index}
                            seat={seats}
                            seatTypes={props.seatTypes}
                            seatChange={seatChange}
                            onSeatAdded={props.onSeatAdded}
                            onSeatChanged={props.onSeatChanged}
                            onSeatDeleted={props.onSeatDeleted}
                            placeInfo={placeInfo}
                            onSeatChoosen={props.onSeatChoosen}
                            onSeatUnchoosen={props.onSeatUnchoosen}
                        />
                    );
                }
            )}
        </div>
    );
}

SeatRow.propsTypes = {
    seats: PropsTypes.array,
    seatTypes: PropsTypes.array,
    placeInfo: PropsTypes.object,
    onSeatChoosen: PropsTypes.func,
    onSeatUnchoosen: PropsTypes.func
}

export default SeatRow;