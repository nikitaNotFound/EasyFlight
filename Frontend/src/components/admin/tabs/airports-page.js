import React, {Component} from 'react';
import AddButton from './common/add-button';
import Airports from './airports/airports';
import Add from './airports/add';
import Edit from './airports/edit'

class AirportsPage extends Component {
    actionModes = {
        none: "",
        adding: "adding-mode",
        editing: "editing-mode"
    }
    actionMode = this.actionModes.none;

    render () {
        return (
            <div className={`tab-content ${this.actionMode}`}>
                <AddButton />
                <Airports />
                <Add />
                <Edit />
            </div>
        );
    }
}

export default AirportsPage;