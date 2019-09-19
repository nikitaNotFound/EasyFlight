import React from 'react';
import PropsTypes from 'prop-types';

import Airport from './airport';

import '../../../../styles/items-list.css';


export default function Airports(props) {
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