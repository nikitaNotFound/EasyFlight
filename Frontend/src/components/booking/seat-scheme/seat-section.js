import React from 'react';
import PropsTypes from 'prop-types';
import SeatZone from './seat-zone';

function SeatSection(props) {
    return (
        <div className="seat-editor-row">
            <div className="seat-editor-number">
                Section {props.placeInfo.section}
            </div>
            <div className="seat-editor-scheme">
                <div className="airplane-rows">
                    {props.seats.map(
                        (seats, index) => {
                            let placeInfo = {};
                            Object.assign(placeInfo, props.placeInfo);
                            placeInfo.zone = index + 1;
                            return (
                                <SeatZone
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
            </div>
        </div>
    );
}

SeatSection.propsTypes = {
    seats: PropsTypes.array,
    placeInfo: PropsTypes.object,
    seatTypes: PropsTypes.array,
    onSeatChoosen: PropsTypes.func,
    onSeatUnchoosen: PropsTypes.func
}

export default SeatSection;