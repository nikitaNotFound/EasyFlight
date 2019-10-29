import React from 'react';
import PropsTypes from 'prop-types';

import EditButton from '../../../common/edit-button';

import CountryObject from '../../../../services/place-models/country';


export default function Country(props) {
    return (
        <div className="row rounded list-item">
            <div className="col-10">
                <h5>{props.country.name}</h5>
            </div>

            <div className="col-2">
                <EditButton categoty="countries" editingItemId={props.country.id}/>
            </div>
        </div>
    );
}

Country.propsTypes = {
    country: PropsTypes.instanceOf(CountryObject)
}