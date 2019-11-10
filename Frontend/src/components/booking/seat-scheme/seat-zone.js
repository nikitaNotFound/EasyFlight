import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SeatRow from './seat-row';

function SeatZone(props) {
    return (
        <div className="airplane-zone">
            <div className="zone-headline">
                {props.placeInfo.zone}
                <div className="zone-name">
                    zone
                </div>
            </div>
            {props.seats.map(
                (seats, index) => {
                    let placeInfo = {};
                    Object.assign(placeInfo, props.placeInfo);
                    placeInfo.row = index + 1;
                    return (
                        <SeatRow 
                            key={index}
                            seats={seats}
                            seatTypes={props.seatTypes}
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

SeatZone.propsTypes = {
    seats: PropsTypes.array,
    placeInfo: PropsTypes.object,
    seatTypes: PropsTypes.array,
    onSeatChoosen: PropsTypes.func,
    onSeatUnchoosen: PropsTypes.func
}

export default SeatZone;