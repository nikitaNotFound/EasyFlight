import React, {useState} from 'react';
import AddButton from './common/add-button';
import Flights from './flights/flights';
import Adding from './flights/add';
import Editing from './flights/edit';

function FlightsPage () {
    const actionModes = {
        none: '',
        adding: 'adding-mode',
        editing: 'editing-mode'
    }

    const [actionMode, changeMode] = useState(actionModes.none);

    return (
        <div className={`tab-content ${actionMode}`}>
            <AddButton onClick={() => changeMode(actionModes.adding)}/>
            <Flights/>
            <Adding cancel={() => changeMode(actionModes.none)}/>
            <Editing/>
        </div>
    );
}

export default FlightsPage;