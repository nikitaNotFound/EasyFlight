import React from 'react';
import Flight from './flight';
import PropsTypes from 'prop-types';
import '../../../../styles/items-list.css';

function Flights(props) {
    return (
        <div className="items-list">
                {props.flights.map(
                    (item, index) => 
                        <Flight
                            flight={item}
                            onEdit={props.onEdit}
                            displayLayout={props.displayLayout}
                            key={index}
                        />
                )}
        </div>
    );
}

Flight.propsTypes = {
    flights: PropsTypes.array
}

export default Flights;