import PropsTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function AddButton (props) {
    return (
        <Link to={`/admin/${props.catalog}/add`} style={{textDecoration:'none', color:'rgb(108, 117, 121)'}}>
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