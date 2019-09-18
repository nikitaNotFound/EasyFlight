import React from 'react';
import PropsTypes from 'prop-types';

import SeatType from './seat-type';


export default function SeatTypes(props) {
    return (
        <div className="seat-types-list rounded">
            <div className="headline">
                Seat types
            </div>
            {props.seatTypes.map(
                (item, key) =>
                    <SeatType seatType={item} key={key}/>
            )}
        </div>
    );
}

SeatTypes.propsTypes = {
    seatTypes: PropsTypes.array
}