import React from 'react';
import PropsTypes from 'prop-types'


export default function FinalButton(props) {
    return (
        <button
            className={`final-button ${props.type} rounded non-selectable`}
            onClick={props.onClick}
        >
            {props.content}
        </button>
    );
}

FinalButton.propsTypes = {
    type: PropsTypes.string,
    onClick: PropsTypes.func,
    content: PropsTypes.string
}