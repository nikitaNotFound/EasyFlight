import React from 'react';
import PropsTypes from 'prop-types'


export default function LayoutHeadline(props) {
    return (
        <div className="headline">{props.content}</div>
    );
}

LayoutHeadline.propsTypes = {
    content: PropsTypes.string
}