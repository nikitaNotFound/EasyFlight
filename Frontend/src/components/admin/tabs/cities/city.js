import React from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

import CityObject from '../../../../services/place-models/city';


export default function City(props) {
    return (
        <div className="row rounded list-item">
            <div className="col-10">
                <h5>{props.city.name}</h5>
            </div>

            <div className="col-2">
                <Link to={`/admin/cities/edit/${props.city.id}`}>
                    <div className="edit-button rounded non-selectable">
                        Edit
                    </div>
                </Link>
            </div>
        </div>
    );
}

City.propsTypes = {
    city: PropsTypes.instanceOf(CityObject),
}