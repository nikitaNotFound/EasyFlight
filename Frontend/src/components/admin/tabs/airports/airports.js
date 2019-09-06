import React from 'react';
import Airport from './airport';
import PropsTypes from 'prop-types';
import '../../../../styles/items-list.css';

function Airports(props) {
    return (
        <div className="items-list">
                {props.airports.map(
                    (item, index) => 
                        <Airport 
                            name={item.name}
                            airport={item}
                            onEdit={props.onEdit}
                            displayLayout={props.displayLayout}
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

export default Airports;