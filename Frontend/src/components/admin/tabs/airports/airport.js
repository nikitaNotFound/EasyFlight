import React, {Component} from 'react';
import AirportHeadline from './airport-headline';
import PropsTypes from 'prop-types';

class Airport extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        city: PropsTypes.string,
        country: PropsTypes.string,
        desc: PropsTypes.string,
        airportId: PropsTypes.number,
        onEdit: PropsTypes.func,
        displayLayout: PropsTypes.func
    }

    render () {
        return (
            <div className="row rounded list-item">
                <div className="col-2">
                    <img src="" className="list-item-img" alt="airport"/>
                </div>

                <div className="col-9">
                    <AirportHeadline 
                        name={this.props.name}
                        location={`${this.props.city}, ${this.props.country}`}
                    />
                    {this.props.desc}
                </div>

                <div className="col-1">
                    <button onClick={
                        () => {
                            this.props.onEdit(this.props.airportId);
                            this.props.displayLayout();
                        }
                    }>
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}

export default Airport;