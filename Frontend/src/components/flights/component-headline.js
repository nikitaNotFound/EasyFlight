import React, { Component }  from 'react';
import PropsTypes from 'prop-types';

function ComponentHeadline(props) {
    return (
        <h4>{props.content}</h4>
    );
}

ComponentHeadline.propsTypes = {
    content: PropsTypes.string
}

export default ComponentHeadline;