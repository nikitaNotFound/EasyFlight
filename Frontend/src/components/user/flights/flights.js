import React, {Component} from 'react';
import Flight from './flight';
import ComponentHeadline from './component-headline';
import * as FlightsService from '../../../services/FlightsService';

class Flights extends Component {
    flights = FlightsService.getAll();

    render () {
        return (
            <div className="list rounded">
                <ComponentHeadline content="Flights list" />

                <div className="container-fluid list-body">
                    {this.flights.map(
                        (item, index) => 
                            <Flight 
                                key={index} 
                                fromCountry={item.fromCountry} 
                                toCountry={item.toCountry} 
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