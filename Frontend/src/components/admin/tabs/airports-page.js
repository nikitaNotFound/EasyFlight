import React, {useState} from 'react';
import AddButton from './common/add-button';
import Airports from './airports/airports';
import Add from './airports/add';
import Edit from './airports/edit'

function AirportsPage () {
    const actionModes = {
        none: '',
        adding: 'adding-mode',
        editing: 'editing-mode'
    }
    const [actionMode, changeMode] = useState(actionModes.none);

    return (
        <div className={`tab-content ${actionMode}`}>
            <AddButton onClick={() => changeMode(actionModes.adding)}/>
            <Airports />
            <Add />
            <Edit />
        </div>
    );
}

export default AirportsPage;