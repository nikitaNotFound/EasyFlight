import React from 'react';
import PropsTypes from 'prop-types';

export default function AirportHeadline(props) {
    return (
        <div className="row">
            <div className="col-6">
                <h5>{props.name}</h5>
            </div>
            <div className="col-6">
                <h6>{props.location}</h6>
            </div>
        </div>
    );
}

AirportHeadline.propsTypes = {
    name: PropsTypes.string,
    location: PropsTypes.string
}