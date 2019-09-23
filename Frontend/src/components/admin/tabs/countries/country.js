import React from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

import CountryObject from '../../../../services/place-models/country';


export default function Country(props) {
    return (
        <div className="row rounded list-item">
            <div className="col-10">
                <h5>{props.country.name}</h5>
            </div>

            <div className="col-2">
                <Link to={`/admin/countries/edit/${props.country.id}`}>
                    <div className="button edit-button rounded non-selectable">
                        Edit
                    </div>
                </Link>
            </div>
        </div>
    );
}

Country.propsTypes = {
    country: PropsTypes.instanceOf(CountryObject)
}