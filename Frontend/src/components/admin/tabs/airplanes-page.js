import React, {Component} from 'react';
import AddButton from './common/add-button';
import Airplanes from './airplanes/airplanes';
import Add from './airplanes/add';
import Edit from './airplanes/edit';

class AirplanesPage extends Component {
    actionModes = {
        none: "",
        adding: "adding-mode",
        editing: "editing-mode"
    }
    actionMode = this.actionModes.adding;

    render () {
        return (
            <div className={`tab-content ${this.actionMode}`}>
                <AddButton/>
                <Airplanes/>
                <Add/>
                <Edit/>
            </div>
        );
    }
}

export default AirplanesPage;