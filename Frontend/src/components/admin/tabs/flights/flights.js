import React, {Component} from 'react';
import Flight from './flight';
import PropsTypes from 'prop-types';

class Flights extends Component {
    propsTypes = {
        flights: PropsTypes.array
    }

    render () {
        return (
            <div className="items-list">
                 {this.props.flights.map(
                        (item) => 
                            <Flight
                                name={item.name}
                                from={item.from}
                                to={item.to}
                                cost={item.cost}
                                desc={item.desc}
                                flightId={item.id}
                                onEdit={this.props.onEdit}
                                displayLayout={this.props.displayLayout}
                            />
                    )}
            </div>
        );
    }
}

export default Flights;