import React from 'react';
import PropsTypes from 'prop-types'

import SeatObject from '../../../services/airplane-models/seat';
import SeatTypeObject from '../../../services/airplane-models/seat-type';


export default function ChoosenSeat(props) {
    return (
        <div className="choosen-seat">
            Floor: {props.seat.floor} <br/>
            Section: {props.seat.section} <br/>
            Zone: {props.seat.zone} <br/>
            Row: {props.seat.row} <br/>
            Number: {props.seat.number} <br/>
            Type: {props.seatType.name} <br/>
        </div>
    );
}

ChoosenSeat.propsTypes = {
    seat: PropsTypes.instanceOf(SeatObject),
    seatType: PropsTypes.instanceOf(SeatTypeObject)
}