import React from 'react';
import PropsTypes from 'prop-types';

import Country from './country';

import '../../../../styles/items-list.css';

export default function Countries(props) {
    // before user press search
    if (props.countries == null) {
        return (
            <div className="items-list">
            </div>
        );
    }

    // when search doesnt give any result
    if (props.countries.length == 0) {
        return (
            <div className="items-list">
                No result
            </div>
        );
    }

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