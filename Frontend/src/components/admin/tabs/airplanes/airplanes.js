import React, {Component} from 'react';
import Airplane from './airplane';
import * as AirplanesService from '../../../../services/AirplanesService';
import PropsTypes from 'prop-types';

class Airplanes extends Component {
    airports = AirplanesService.getAll();

    propsTypes = {
        onEdit: PropsTypes.func,
        displayLayout: PropsTypes.func
    }

    render () {
        return (
            <div className="items-list">
                 {this.airports.map(
                        (item) => 
                            <Airplane 
                                name={item.name} 
                                sitsCount={item.sits.length}
                                maxMass={item.maxMass}
                                airplaneId={item.id}
                                onEdit={this.props.onEdit}
                                displayLayout={this.props.displayLayout}
                            />
                    )}
            </div>
        );
    }
}

export default Airplanes;