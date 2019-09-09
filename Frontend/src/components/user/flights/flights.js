import React, {Component} from 'react';
import Flight from './flight';
import ComponentHeadline from '../component-headline';
import PropsTypes from 'prop-types';
import '../../../styles/flight-list.scss';

class Flights extends Component {
    propsTypes = {
        flights: PropsTypes.array
    }

    render () {
        return (
            <div className="list rounded">
                <ComponentHeadline content="Flights list"/>

                <div className="container-fluid list-body">
                    {this.props.flights.map(
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