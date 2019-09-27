import React from 'react';
import PropsTypes from 'prop-types';

import City from './city';

import '../../../../styles/items-list.css';


export default function Countries(props) {
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

Countries.propsTypes = {
    cities: PropsTypes.array
}