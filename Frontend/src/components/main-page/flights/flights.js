import React from 'react';
import Flight from './flight';
import ComponentHeadline from '../../common/component-headline';
import PropsTypes from 'prop-types';


function Flights(props) {
    function showSearchResult() {
        if (props.flights.length == 0) {
            return <div>No items found</div>
        }
    }

    return (
        <div className="list rounded">
            <ComponentHeadline content="Flights list"/>
            {showSearchResult()}

            <div className="container-fluid list-body">
                {props.flights.map(
                    (flight, index) => 
                        <Flight 
                            flight={flight}
                            key={index}
                        />
                )}
            </div>
        </div>
    );
}

Flights.propsTypes = {
    flights: PropsTypes.array
}

export default Flights;