import React, {Component} from 'react';
import Airport from './airport';
import PropsTypes from 'prop-types';
import * as AirportService from '../../../../services/AirportService';

class Airports extends Component {
    airports = AirportService.getAirports();

    propsTypes = {
        onEdit: PropsTypes.func,
        displayLayout: PropsTypes.func,
        airports: PropsTypes.array
    }

    render () {
        return (
            <div className="items-list">
                 {this.props.airports.map(
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