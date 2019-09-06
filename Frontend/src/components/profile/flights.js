import React from 'react';
import PropsTypes from 'prop-types';
import Flight from './flight';

function Flights(props) {
    return (
        <div className="flight-history-list">
            {props.flights.map(
                (flight, index) =>
                    <Flight flight={flight} key={index}/>
            )}
        </div>
    );
}

Flights.propsTypes = {
    flights: PropsTypes.array
}

export default Flights;