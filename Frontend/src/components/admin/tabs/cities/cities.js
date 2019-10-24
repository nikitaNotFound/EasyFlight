import React from 'react';
import PropsTypes from 'prop-types';

import City from './city';

import '../../../../styles/items-list.css';

export default function Cities(props) {
    // before user press search
    if (props.cities == null) {
        return (
            <div className="items-list">
            </div>
        );
    }

    // when search doesnt give any result
    if (props.cities.length == 0) {
        return (
            <div className="items-list">
                No result
            </div>
        );
    }

    return (
        <div className="items-list">
            {props.cities.map(
                (city, index) =>
                    <City
                        city={city}
                        key={index}
                    />
            )}
        </div>
    );
}

Cities.propsTypes = {
    cities: PropsTypes.array
}