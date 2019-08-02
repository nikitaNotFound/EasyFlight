import React from 'react';
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
    const actionMode = actionModes.none;

    return (
        <div className={`tab-content ${actionMode}`}>
            <AddButton/>
            <Flights/>
            <Adding/>
            <Editing/>
        </div>
    );
}

export default FlightsPage;