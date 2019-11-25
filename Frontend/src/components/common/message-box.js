import React from 'react';
import PropsTypes from 'prop-types';
import '../../styles/message-box.css';

function MessageBox(props) {
    return (
        <div>
            <div className="overlay"/>
            <div className="message-box">
                <div className="message-body">
                    {props.message}
                </div>
                <button
                    className="close-button non-selectable"
                    onClick={() => props.hideFunc(null)}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

MessageBox.propsTypes = {
    message: PropsTypes.string,
    hideFunc: PropsTypes.func
}

export default MessageBox;