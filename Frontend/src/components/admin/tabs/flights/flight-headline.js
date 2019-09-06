import PropsTypes from 'prop-types';
import React from 'react';

function Headline(props) {
    return (
        <div className="row">
            <div className="col-6">
                <h5>From: {props.from}</h5>
            </div>
            <div className="col-6">
                <h5>To: {props.to}</h5>
            </div>
        </div>
    );
}

Headline.propsTypes = {
    from: PropsTypes.string,
    to: PropsTypes.string,
    cost: PropsTypes.number
}

export default Headline;