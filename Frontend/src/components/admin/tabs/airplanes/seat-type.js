import React from 'react';
import PropsTypes from 'prop-types';

function SeatType(props) {
    function onTypeDelete() {
        props.onTypeDelete(props.id);
    }

    return (
        <div className="seat-type-item">
            <div className="seat-type-color-demo" style={{background:props.color}}/>
            {props.name}
            <div
                className="seat-type-remove-button non-selectable"
                onClick={onTypeDelete}>
                    delete
            </div>
        </div>
    );
}

SeatType.propsTypes = {
    name: PropsTypes.string,
    color: PropsTypes.color,
    id: PropsTypes.number,
    onTypeDelete: PropsTypes.func
}

export default SeatType;