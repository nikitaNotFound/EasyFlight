import React, {Component} from 'react';
import Flight from './flight';
import ComponentHeadline from './component-headline';
import * as FlightService from '../../../services/FlightService';

class Flights extends Component {
    flights = FlightService.getAll();

    render () {
        return (
            <div className="list rounded">
                <ComponentHeadline content="Flights list" />

                <div className="container-fluid list-body">
                    {this.flights.map(
                        (item, index) => 
                            <Flight 
                                key={index} 
                                from={item.from} 
                                to={item.to} 
                                cost={item.cost} 
                                desc={item.desc}
                            />
                    )}
                </div>
            </div>
        );
    }
}

export default Flights;