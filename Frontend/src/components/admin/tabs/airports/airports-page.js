import React, {useState} from 'react';
import AddButton from '../common/add-button';
import Airports from './airports';
import * as AirportsService from '../../../../services/AirportsService';

function AirportsPage () {
    const airports = AirportsService.getAll();

    return (
        <div className="tab-content">
            <AddButton catalog="airports"/>
            <Airports airports={airports}/>
        </div>
    );
}

export default AirportsPage;