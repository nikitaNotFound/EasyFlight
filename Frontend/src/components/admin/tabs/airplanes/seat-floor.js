import React from 'react';
import PropsTypes from 'prop-types';
import SeatSection from './seat-section';

function SeatFloor(props) {
    return (
        <div className="seat-editor-floor">
            <div className="seat-editor-floor-number">
                {props.placeInfo.floor} floor
            </div>

            {props.seats.map(
                (seats, index) => {
                    let placeInfo = {};
                    Object.assign(placeInfo, props.placeInfo);
                    placeInfo.section = index + 1;
                    return (
                        <SeatSection 
                            seats={seats}
                            placeInfo={placeInfo}
                            seatTypes={props.seatTypes}
                            key={index + 1}/>
                    );
                }
            )}
        </div>
    );
}

SeatFloor.propsTypes = {
    placeInfo: PropsTypes.object,
    seats: PropsTypes.array,
    seatTypes: PropsTypes.array
}

export default SeatFloor;