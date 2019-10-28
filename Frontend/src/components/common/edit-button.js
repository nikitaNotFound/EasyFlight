import React from 'react';
import PropsTypes from 'prop-types'

import { Link } from 'react-router-dom';

export default function EditButton(props) {
    return (
        <Link to={`/admin/${props.categoty}/edit/${props.editingItemId}`}>
            <button className="button edit-button rounded non-selectable">
                Edit
            </button>
        </Link>
    );
}

EditButton.propsTypes = {
    categoty: PropsTypes.string,
    editingItemId: PropsTypes.number
}