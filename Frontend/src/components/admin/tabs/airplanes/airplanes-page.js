import React from 'react';
import AddButton from '../common/add-button';
import Airplanes from './airplanes';
import * as AirplaneService from '../../../../services/AirplaneService';

function AirplanesPage () {
    const airplanes = AirplaneService.getAll();

    return (
        <div className="tab-content">
            <AddButton catalog="airplanes"/>
            <Airplanes airplanes={airplanes}/>
        </div>
    );
}

export default AirplanesPage;