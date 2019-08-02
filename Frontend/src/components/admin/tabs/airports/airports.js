import React, {Component} from 'react';
import Airport from './airport';
import PropsTypes from 'prop-types';
import * as AirportsService from '../../../../services/AirportsService';

class Airports extends Component {
    airports = AirportsService.getAll();

    propsTypes = {
        onEdit: PropsTypes.func,
        displayLayout: PropsTypes.func
    }

    render () {
        return (
            <div className="items-list">
                 {this.airports.map(
                        (item) => 
                            <Airport 
                                name={item.name} 
                                city={item.city} 
                                country={item.country} 
                                desc={item.desc}
                                airportId={item.id}
                                onEdit={this.props.onEdit}
                                displayLayout={this.props.displayLayout}
                            />
                    )}
            </div>
        );
    }
}

export default Airports;