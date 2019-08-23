import React from 'react';
import PropsTypes from 'prop-types';
import SeatRow from './seat-row';

function SeatSection (props) {
    return (
        <div className="seat-editor-row">
            <div className="seat-editor-number">
                {props.placeInfo.section}
            </div>
            <div className="seat-editor-scheme">
                <div className="airplane-rows">
                    {props.seats.map(
                        (item, index) => {
                            let placeInfo = {};
                            Object.assign(placeInfo, props.placeInfo);
                            placeInfo.row = index + 1;
                            return (<SeatRow key={index} seats={item} placeInfo={placeInfo}/>);
                        }
                    )}
                </div>
            </div>
        </div>
    );
}

SeatSection.propsTypes = {
    seats: PropsTypes.array,
    placeInfo: PropsTypes.object
}

export default SeatSection;