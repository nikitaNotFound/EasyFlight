import React, {Component} from 'react';
import Airplane from './airplane';
import * as AirplanesService from '../../../../services/AirplanesService';

class Airplanes extends Component {
    airports = AirplanesService.getAll();

    render () {
        return (
            <div className="items-list">
                 {this.airports.map(
                        (item, index) => 
                            <Airplane 
                                key={index} 
                                name={item.name} 
                                sitsCount={item.sitslength}
                                maxMass={item.maxMass}
                            />
                    )}
            </div>
        );
    }
}

export default Airplanes;