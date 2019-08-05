import React, {useState} from 'react';
import AddButton from '../common/add-button';
import Airplanes from './airplanes';
import * as AirplanesService from '../../../../services/AirplanesService';

function AirplanesPage () {
    const airplanes = AirplanesService.getAll();

    return (
        <div className="tab-content">
            <AddButton catalog="airplanes"/>
            <Airplanes airplanes={airplanes}/>
        </div>
    );
}

export default AirplanesPage;