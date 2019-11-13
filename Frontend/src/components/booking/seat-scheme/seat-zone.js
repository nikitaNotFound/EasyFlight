import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import SeatRow from './seat-row';

function initializeScheme(props) {
    let scheme = props.seats.slice();

    const maxLength = scheme.reduce(
        (length, row) => row.length > length ? row.length : length,
        0
    )

    for (let i = 0, len = scheme.length; i < len; i++) {
        scheme[i].length = maxLength;
    }

    return scheme;
}

function SeatZone(props) {
    const [zoneScheme, changeZoneScheme] = useState(initializeScheme(props));

    return (
        <div className="airplane-zone">
            <div className="zone-headline">
                {props.placeInfo.zone}
                <div className="zone-name">
                    zone
                </div>
            </div>
            {zoneScheme.map(
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