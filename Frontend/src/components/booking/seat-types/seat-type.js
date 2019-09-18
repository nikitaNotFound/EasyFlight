import React from 'react';
import PropsTypes from 'prop-types'

import SeatTypeObject from '../../../services/airplane-models/seat-type';


export default function SeatType(props) {
    return (
        <div className="item">
            <div className="seat-color" style={{background: props.seatType.color}}/>
            <div className="seat-name">
                {props.seatType.name}
            </div>
        </div>
    );
}

SeatType.propsTypes = {
    seatType: PropsTypes.instanceOf(SeatTypeObject)
}