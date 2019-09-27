import React from 'react';
import PropsTypes from 'prop-types';

import SeatType from './seat-type';
import LayoutHeadline from '../layout-headline';


export default function SeatTypes(props) {
    return (
        <div className="seat-types-list rounded">
            <LayoutHeadline content="Seat types"/>
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