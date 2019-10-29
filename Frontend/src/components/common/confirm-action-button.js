import React from 'react';
import PropsTypes from 'prop-types'

export default function ConfirmActionButton(props) {
    return (
        <button className="custom-button big" onClick={props.onClick}>
            {props.buttonContent}
        </button>
    );
}

ConfirmActionButton.propsTypes = {
    onClick: PropsTypes.func,
    buttonContent: PropsTypes.string
}