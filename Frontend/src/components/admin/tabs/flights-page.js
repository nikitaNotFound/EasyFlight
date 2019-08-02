import React, {useState} from 'react';
import AddButton from './common/add-button';
import Flights from './flights/flights';
import Add from './flights/add';
import Edit from './flights/edit';
import * as FlightsService from '../../../services/FlightsService';

function FlightsPage () {
    const actionModes = {
        none: '',
        adding: 'adding-mode',
        editing: 'editing-mode'
    }

    const [actionMode, changeMode] = useState(actionModes.none);
    const [editingFlightId, setEditingFlight] = useState(1);
    const editingObject = FlightsService.getById(editingFlightId);

    return (
        <div className={`tab-content ${actionMode}`}>
            <AddButton onClick={() => changeMode(actionModes.adding)}/>
            <Flights
                onEdit={setEditingFlight} 
                displayLayout={() => changeMode(actionModes.editing)}/>
            <Add cancel={() => changeMode(actionModes.none)}/>
            <Edit 
                object={editingObject}
                cancel={() => changeMode(actionModes.none)}/>
        </div>
    );
}

export default FlightsPage;