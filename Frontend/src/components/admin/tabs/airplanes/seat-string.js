import React from 'react';
import PropsTypes from 'prop-types';
import Seat from './seat';

function SeatString (props) {
    for (let i = 0, len = props.seats.length; i < len; i++) {
        if (props.seats[i] === undefined) {
            props.seats[i] = undefined;
        }
    }

    function seatChange (seat, index) {
        const storage = props.seats;
        storage[index] = seat;
        props.stringChange(storage, props.key);
    }

    return (
        <div className="airplane-string">
            {props.seats.map(
                (item, index) => {
                    let placeInfo = {};
                    Object.assign(placeInfo, props.placeInfo);
                    placeInfo.number = index + 1;
                    return (
                        <Seat
                            key={index}
                            seat={item}
                            seatTypes={props.seatTypes}
                            seatChange={seatChange}
                            onSeatAdded={props.onSeatAdded}
                            onSeatChanged={props.onSeatChanged}
                            onSeatDeleted={props.onSeatDeleted}
                            placeInfo={placeInfo}/>
                    );
                }
            )}
        </div>
    );
}

SeatString.propsTypes = {
    seats: PropsTypes.array,
    seatTypes: PropsTypes.array,
    placeInfo: PropsTypes.object,
    onSeatAdded: PropsTypes.func,
    onSeatChanged: PropsTypes.func,
    onSeatDeleted: PropsTypes.func
}

export default SeatString;