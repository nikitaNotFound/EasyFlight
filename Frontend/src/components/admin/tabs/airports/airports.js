import React, {Component} from 'react';
import Airport from './airport';
import * as AirportsService from '../../../../services/AirportsService';

class Airports extends Component {
    airports = AirportsService.getAll();

    render () {
        return (
            <div className="airports">
                 {this.airports.map(
                        (item, index) => 
                            <Airport 
                                key={index} 
                                name={item.name} 
                                city={item.city} 
                                country={item.country} 
                                desc={item.desc}
                            />
                    )}
            </div>
        );
    }
}

export default Airports;