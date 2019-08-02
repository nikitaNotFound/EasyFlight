import React, {useState} from 'react';
import AddButton from './common/add-button';
import Airplanes from './airplanes/airplanes';
import Add from './airplanes/add';
import Edit from './airplanes/edit';
import * as AirplanesService from '../../../services/AirplanesService';

function AirplanesPage () {
    const actionModes = {
        none: '',
        adding: 'adding-mode',
        editing: 'editing-mode'
    }
    const [actionMode, changeMode] = useState(actionModes.none);
    const [editingAirplaneId, setEditingAirplane] = useState(1);
    const editingObject = AirplanesService.getById(editingAirplaneId);

    return (
        <div className={`tab-content ${actionMode}`}>
            <AddButton onClick={() => changeMode(actionModes.adding)}/>
            <Airplanes 
                onEdit={setEditingAirplane} 
                displayLayout={() => changeMode(actionModes.editing)}/>
            <Add cancel={() => changeMode(actionModes.none)}/>
            <Edit 
                object={editingObject}
                cancel={() => changeMode(actionModes.none)}/>
        </div>
    );
}

export default AirplanesPage;