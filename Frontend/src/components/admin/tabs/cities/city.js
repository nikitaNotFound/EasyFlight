import React from 'react';
import PropsTypes from 'prop-types';

import EditButton from '../../../common/edit-button';

import CityObject from '../../../../services/place-models/city';

export default function City(props) {
    return (
        <div className="row rounded list-item">
            <div className="col-10">
                <h5>{props.city.name}</h5>
            </div>

            <div className="col-2">
                <EditButton categoty="cities" editingItemId={props.city.id}/>
            </div>
        </div>
    );
}

City.propsTypes = {
    city: PropsTypes.instanceOf(CityObject)
}