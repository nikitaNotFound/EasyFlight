import React, {Component} from 'react';
import AirportHeadline from './airport-headline';
import PropsTypes from 'prop-types';

class Airport extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        city: PropsTypes.string,
        country: PropsTypes.string,
        desc: PropsTypes.string
    }

    render () {
        return (
            <div className="row rounded airports-item">
                <div className="col-2">
                    <img src="" className="airports-item-img" alt="airport"/>
                </div>

                <div className="col-9">
                    <AirportHeadline 
                        name={this.props.name}
                        location={`${this.props.city}, ${this.props.country}`}
                    />
                    <div className="airports-item-descr">
                        {this.props.desc}
                    </div>
                </div>

                <div className="col-1">
                    <button>Edit</button>
                </div>
            </div>
        );
    }
}

export default Airport;