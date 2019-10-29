import React from 'react';
import PropsTypes from 'prop-types';

function SeatType(props) {
    return (
        <div className="seat-type-item">
            <div className="seat-type-color-demo" style={{background:props.color}}/>
            {props.name}
            <div
                className="seat-type-remove-button non-selectable"
                onClick={() => props.onTypeDelete(props.arrayIndex)}>
                    delete
            </div>
        </div>
    );
}

SeatType.propsTypes = {
    name: PropsTypes.string,
    color: PropsTypes.color,
    id: PropsTypes.number,
    onTypeDelete: PropsTypes.func,
    arrayIndex: PropsTypes.number
}

export default SeatType;