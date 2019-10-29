import PropsTypes from 'prop-types';
import React from 'react';

function Headline(props) {
    return (
        <h2 className="non-selectable editing-headline">{props.name}</h2>
    );
}

Headline.propsTypes = {
    name: PropsTypes.string,
}

export default Headline;