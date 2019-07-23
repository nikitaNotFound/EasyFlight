import React, {Component} from "react";
import FlightsListItem from "./item";

class Body extends Component {
    flights = [ { fromCountry: "test1", toCountry: "test2", cost: "100$", desc: "This is a test flight." },
                { fromCountry: "test3", toCountry: "test4", cost: "1000$", desc: "This is not a test flight." }
              ];

    render () {
        return (
            <div class="list rounded" name="flights-list" id="flights-list">
                <h4>Flights list</h4>

                <div class="container-fluid list-body">
                    {this.flights.map(
                        (item, index) => 
                            <FlightsListItem 
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