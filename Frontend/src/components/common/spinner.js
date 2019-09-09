import React from 'react';
import PropsTypes from 'prop-types';

function Spinner(props) {
    return (
        <div>
            {props.headline}
        </div>
    );
}

Spinner.propsTypes = {
    headline: PropsTypes.string
}

export default Spinner;