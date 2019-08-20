import PropsTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function AddButton (props) {
    return (
        <Link to={`/admin/${props.catalog}/add`} className="non-dec-link add-item-button">
            <div className="add-airport rounded non-selectable">
                    +
            </div>
        </Link>
    );
}

AddButton.propsTypes = {
    catalog: PropsTypes.string
}

export default AddButton;