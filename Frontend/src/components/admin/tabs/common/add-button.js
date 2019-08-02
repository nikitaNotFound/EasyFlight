import PropsTypes from 'prop-types';
import React from 'react';

function AddAirport (props) {
    return (
        <div className="add-airport rounded non-selectable" onClick={props.onClick}>
            +
        </div>
    );
}

AddAirport.propsTypes = {
    onClick: PropsTypes.func
}

export default AddAirport;