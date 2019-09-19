import React from 'react';
import PropsTypes from 'prop-types';

import Country from './country';

import '../../../../styles/items-list.css';


export default function Countries(props) {
    return (
        <div className="items-list">
                {props.countries.map(
                    (country, index) =>
                        <Country
                            country={country}
                            key={index}
                        />
                )}
        </div>
    );
}

Countries.propsTypes = {
    countries: PropsTypes.array
}