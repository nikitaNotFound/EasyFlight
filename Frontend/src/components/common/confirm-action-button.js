import React from 'react';
import PropsTypes from 'prop-types'

export default function ConfirmActionButton(props) {
    return (
        <button
            type="submit"
            className="custom-button big non-selectable"
            onClick={props.onClick ? props.onClick : ""}
        >
            {props.buttonContent}
        </button>
    );
}

ConfirmActionButton.propsTypes = {
    onClick: PropsTypes.func,
    buttonContent: PropsTypes.string
}