import React, {Component} from 'react';
import FlightHeadline from './flight-headline';
import PropsTypes from 'prop-types';

class Airport extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        from: PropsTypes.string,
        to: PropsTypes.string,
        cost: PropsTypes.number,
        desc: PropsTypes.string
    }

    render () {
        return (
            <div className="row rounded list-item">
                <div className="col-2">
                    <img src="" className="list-item-img" alt="airport"/>
                </div>

                <div className="col-9">
                    <FlightHeadline 
                        name={this.props.name}
                        from={this.props.from}
                        to={this.props.to}
                        cost={this.props.cost}
                    />
                    {this.props.desc}
                </div>

                <div className="col-1">
                    <button>Edit</button>
                </div>
            </div>
        );
    }
}

export default Airport;