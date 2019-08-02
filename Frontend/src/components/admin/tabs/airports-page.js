import React, {useState} from 'react';
import AddButton from './common/add-button';
import Airports from './airports/airports';
import Add from './airports/add';
import Edit from './airports/edit'
import * as AirportsService from '../../../services/AirportsService';

function AirportsPage () {
    const actionModes = {
        none: '',
        adding: 'adding-mode',
        editing: 'editing-mode'
    }
    const [actionMode, changeMode] = useState(actionModes.none);
    const [editingAirportId, setEditingAirport] = useState(1);
    const editingObject = AirportsService.getById(editingAirportId);

    return (
        <div className={`tab-content ${actionMode}`}>
            <AddButton onClick={() => changeMode(actionModes.adding)}/>
            <Airports
                onEdit={setEditingAirport} 
                displayLayout={() => changeMode(actionModes.editing)}/>
            <Add cancel={() => changeMode(actionModes.none)}/>
            <Edit 
                object={editingObject}
                cancel={() => changeMode(actionModes.none)}/>
        </div>
    );
}

export default AirportsPage;