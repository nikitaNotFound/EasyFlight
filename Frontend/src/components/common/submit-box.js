import React from 'react';
import PropsTypes from 'prop-types';


export default function SubmitBox(props) {
    return (
        <div className="message-box">
            <div className="message-body">
                {props.message}
            </div>
            <div
                className="close-button non-selectable"
                onClick={() => props.hideFunc(null)}
            >
                Close
            </div>
            <div
                className="submit-button non-selectable"
                onClick={props.submitFunc}
            >
                Submit
            </div>
        </div>
    );
}

SubmitBox.propsTypes = {
    message: PropsTypes.func,
    submitFunc: PropsTypes.func,
    hideFunc: PropsTypes.func
}