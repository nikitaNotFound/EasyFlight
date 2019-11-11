import React from 'react';
import PropsTypes from 'prop-types';
import '../../styles/component-headline.css';

function ComponentHeadline(props) {
    return (
        <h4 className="component-headline non-selectable">{props.content}</h4>
    );
}

ComponentHeadline.propsTypes = {
    content: PropsTypes.string
}

export default ComponentHeadline;