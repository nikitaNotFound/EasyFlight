import React from 'react';
import PropsTypes from 'prop-types';

import ChoosenSeat from './choosen-seat';
import LayoutHeadline from '../layout-headline';


export default function ChoosenSeats(props) {
    function getSeatType(seat) {
        for (let i = 0, len = props.seatTypes.length; i < len; i++) {
            if (seat.typeId === props.seatTypes[i].id) {
                return props.seatTypes[i];
            }
        }
    }

    return (
        <div className="choosen-seats rounded">
            <LayoutHeadline content="Choosen seats"/>
            {props.choosenSeats.map(
                (seat, index) => 
                    <ChoosenSeat
                        seat={seat}
                        seatType={getSeatType(seat)}
                        key={index}
                    />
            )}
        </div>
    );
}

ChoosenSeats.propsTypes = {
    choosenSeats: PropsTypes.array,
    seatTypes: PropsTypes.array
}