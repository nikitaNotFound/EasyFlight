import React, {useState} from 'react';
import AddButton from './common/add-button';
import Airplanes from './airplanes/airplanes';
import Add from './airplanes/add';
import Edit from './airplanes/edit';

function AirplanesPage () {
    const actionModes = {
        none: '',
        adding: 'adding-mode',
        editing: 'editing-mode'
    }
    const [actionMode, changeMode] = useState(actionModes.none);

    return (
        <div className={`tab-content ${actionMode}`}>
            <AddButton onClick={() => changeMode(actionModes.adding)}/>
            <Airplanes/>
            <Add onClick={() => changeMode(actionModes.none)}/>
            <Edit/>
        </div>
    );
}

export default AirplanesPage;