import React from 'react';
import PropsTypes from 'prop-types';

import Airport from './airport';

import '../../../../styles/items-list.css';

export default function Airports(props) {
    // before user press search
    if (props.airports == null) {
        return (
            <div className="items-list">
            </div>
        );
    }

    // when search doesnt give any result
    if (props.airports.length == 0) {
        return (
            <div className="items-list">
                No result
            </div>
        );
    }

    return (
        <div className="items-list">
                {props.airports.map(
                    (item, index) => 
                        <Airport 
                            airport={item}
                            key={index}
                        />
                )}
        </div>
    );
}

Airports.propsTypes = {
    onEdit: PropsTypes.func,
    displayLayout: PropsTypes.func,
    airports: PropsTypes.array
}