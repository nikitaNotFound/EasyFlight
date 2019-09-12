import React, {Component} from 'react';
import Airplane from './airplane';
import PropsTypes from 'prop-types';
import '../../../../styles/items-list.css';

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
                        (item, index) => 
                            <Airplane 
                                name={item.name} 
                                seatCount={item.seats.length}
                                carrying={item.carrying}
                                airplaneId={item.id}
                                onEdit={this.props.onEdit}
                                displayLayout={this.props.displayLayout}
                                key={index}
                            />
                    )}
            </div>
        );
    }
}

export default Airplanes;