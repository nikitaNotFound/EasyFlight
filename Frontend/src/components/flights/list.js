import React, {Component} from 'react';
import Item from './list-item';
import ComponentHeadline from './component-headline';
import FlightsController from '../../services/FlightsController';

class Body extends Component {
    flights = FlightsController.getAll();

    render () {
        return (
            <div class="list rounded">
                <ComponentHeadline content="Flights list" />

                <div class="container-fluid list-body">
                    {this.flights.map(
                        (item, index) => 
                            <Item 
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

export default Body;