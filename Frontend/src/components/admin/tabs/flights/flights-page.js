import React from 'react';
import AddButton from '../common/add-button';
import Flights from './flights';
import * as FlightsService from '../../../../services/FlightsService';

function FlightsPage () {
    const flights = FlightsService.getAll();

    return (
        <div className="tab-content">
            <AddButton catalog="flights"/>
            <Flights flights={flights}/>
        </div>
    );
}

export default FlightsPage;