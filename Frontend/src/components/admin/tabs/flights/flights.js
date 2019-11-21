import React from 'react';
import Flight from './flight';
import PropsTypes from 'prop-types';
import '../../../../styles/items-list.css';

function Flights(props) {
    // before user press search
    if (props.flights == null) {
        return (
            <div className="items-list">
            </div>
        );
    }

    // when search doesnt give any result
    if (props.flights.length === 0) {
        return (
            <div className="items-list">
                No result
            </div>
        );
    }

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