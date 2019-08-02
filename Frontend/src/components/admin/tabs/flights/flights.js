import React, {Component} from 'react';
import Flight from './flight';
import * as FlightsService from '../../../../services/FlightsService';

class Flights extends Component {
    flights = FlightsService.getAll();

    render () {
        return (
            <div className="items-list">
                 {this.flights.map(
                        (item, index) => 
                            <Flight
                                key={index}
                                name={item.name}
                                from={item.from}
                                to={item.to}
                                cost={item.cost}
                                desc={item.desc}
                            />
                    )}
            </div>
        );
    }
}

export default Flights;