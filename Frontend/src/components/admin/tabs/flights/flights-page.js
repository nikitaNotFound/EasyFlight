import React from 'react';
import AddButton from '../common/add-button';
import Flights from './flights';
import * as FlightService from '../../../../services/FlightService';

function FlightsPage () {
    const flights = FlightService.getAll();

    return (
        <div className="tab-content">
            <AddButton catalog="flights"/>
            <Flights flights={flights}/>
        </div>
    );
}

export default FlightsPage;