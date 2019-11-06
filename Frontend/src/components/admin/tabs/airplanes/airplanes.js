import React from 'react';
import PropsTypes from 'prop-types';

import Airplane from './airplane';

import '../../../../styles/items-list.css';

export default function Airplanes(props) {
    // before user press search
    if (props.airplanes == null) {
        return (
            <div className="items-list">
            </div>
        );
    }

    // when search doesnt give any result
    if (props.airplanes.length == 0) {
        return (
            <div className="items-list">
                No result
            </div>
        );
    }

    return (
        <div className="items-list">
            {props.airplanes.map(
                (item, index) => 
                    <Airplane 
                        airplane={item}
                        key={index}
                    />
            )}
        </div>
    );
}

Airplanes.propsTypes = {
    onEdit: PropsTypes.func,
    displayLayout: PropsTypes.func,
    airplanes: PropsTypes.array
}