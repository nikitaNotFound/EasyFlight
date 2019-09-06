import React from 'react';
import Flight from './flight';
import PropsTypes from 'prop-types';
import '../../../../styles/items-list.css';

function Flights(props) {
    return (
        <div className="items-list">
                {props.flights.map(
                    (item) => 
                        <Flight
                            name={item.name}
                            fromId={item.fromId}
                            toId={item.toId}
                            desc={item.desc}
                            flightId={item.id}
                            onEdit={props.onEdit}
                            displayLayout={props.displayLayout}
                        />
                )}
        </div>
    );
}

Flight.propsTypes = {
    flights: PropsTypes.array
}

export default Flights;