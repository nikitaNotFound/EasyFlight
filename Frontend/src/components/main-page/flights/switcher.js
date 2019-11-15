import React from 'react';
import PropsTypes from 'prop-types';

export default function Switcher(props) {
    return (
        <div className="content-filter-switcher" onClick={props.switcher}>
            {props.value}
        </div>
    );
}

Switcher.propsTypes = {
    switcher: PropsTypes.func,
    value: PropsTypes.string
}