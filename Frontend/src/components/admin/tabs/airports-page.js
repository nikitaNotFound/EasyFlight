import React, {Component} from 'react';
import AddButton from './airports/add-button';
import Airports from './airports/airports';
import Add from './airports/add';
import Edit from './airports/edit'

class AirportsPage extends Component {
    render () {
        return (
            <div className="tab-content">
                <AddButton />
                <Airports />
                <Add />
                <Edit />
            </div>
        );
    }
}

export default AirportsPage;