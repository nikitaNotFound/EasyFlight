import React, {Component} from 'react';
import Airplane from './airplane';
import PropsTypes from 'prop-types';

class Airplanes extends Component {
    propsTypes = {
        onEdit: PropsTypes.func,
        displayLayout: PropsTypes.func,
        airplanes: PropsTypes.array
    }

    render () {
        return (
            <div className="items-list">
                 {this.props.airplanes.map(
                        (item) => 
                            <Airplane 
                                name={item.name} 
                                seatCount={item.seats.length}
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