import React from 'react';
import PropsTypes from 'prop-types';

import Airplane from './airplane';

import '../../../../styles/items-list.css';

export default function Airplanes(props) {
    return (
        <div className="items-list">
            {props.airplanes.map(
                (item, index) => 
                    <Airplane 
                        name={item.name} 
                        seatCount={item.seats.length}
                        carrying={item.carrying}
                        airplaneId={item.id}
                        onEdit={props.onEdit}
                        displayLayout={props.displayLayout}
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