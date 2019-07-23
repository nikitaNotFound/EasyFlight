import React, {Component} from 'react';
import Item from './item';
import FlightsController from '../../services/FlightsController';

class Body extends Component {
    flights = FlightsController.getAll();

    render () {
        return (
            <div class="list rounded" name="flights-list" id="flights-list">
                <h4>Flights list</h4>

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