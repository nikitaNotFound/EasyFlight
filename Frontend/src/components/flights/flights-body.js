import React from "react";
import FlightsListItem from "./flights-item";

class FlightsListBody extends React.Component {
    flights = [ { fromCountry: "test1", toCountry: "test2", cost: "100$", desc: "This is a test flight." },
                { fromCountry: "test3", toCountry: "test4", cost: "1000$", desc: "This is not a test flight." }
              ];

    render () {
        return (
        <div class="list rounded" name="flights-list" id="flights-list">
            <div class="container-fluid list-header" name="list-header" id="list-header">
                <h4>Flights list</h4>
            </div>

            <div class="container-fluid list-body" name="list-body" id="list-body">
                {this.flights.map(
                    (item) => {
                    return <FlightsListItem fromCountry={item.fromCountry} 
                                    toCountry={item.toCountry} 
                                    cost={item.cost} 
                                    desc={item.desc}
                            />;
                    }
                )}
                
            </div>
        </div>
        );
    }
}

export default FlightsListBody;