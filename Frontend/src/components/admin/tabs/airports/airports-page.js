import React from 'react';
import AddButton from '../common/add-button';
import Airports from './airports';
import * as AirportService from '../../../../services/AirportService';

function AirportsPage () {
    const airports = AirportService.getAll();

    return (
        <div className="tab-content">
            <AddButton catalog="airports"/>
            <Airports airports={airports}/>
        </div>
    );
}

export default AirportsPage;