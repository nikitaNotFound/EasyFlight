import React from 'react';
import PropsTypes from 'prop-types';
import Seat from './seat';

function SeatRow(props) {
    for (let i = 0, len = props.seats.length; i < len; i++) {
        if (!props.seats[i]) {
            props.seats[i] = null;
        }
    }

    return (
        <div className="airplane-row">
            <div className="row-body">
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
                                onSeatAdded={props.onSeatAdded}
                                onSeatChanged={props.onSeatChanged}
                                onSeatDeleted={props.onSeatDeleted}
                                placeInfo={placeInfo}
                            />
                        );
                    }
                )}
            </div>
            <div className="row-headline">
                {props.placeInfo.row}
                <div className="row-name">
                    row
                </div>
            </div>
        </div>
    );
}

SeatRow.propsTypes = {
    seats: PropsTypes.array,
    seatTypes: PropsTypes.array,
    placeInfo: PropsTypes.object,
    onSeatAdded: PropsTypes.func,
    onSeatChanged: PropsTypes.func,
    onSeatDeleted: PropsTypes.func
}

export default SeatRow;