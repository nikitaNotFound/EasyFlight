import PropsTypes from 'prop-types';
import React from 'react';

function Headline (props) {
    return (
        <h1 className="non-selectable">{props.name}</h1>
    );
}

Headline.propsTypes = {
    name: PropsTypes.string,
}

export default Headline;