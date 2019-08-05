import React, {Component} from 'react';
import AirportHeadline from './airport-headline';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom'

class Airport extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        city: PropsTypes.string,
        country: PropsTypes.string,
        desc: PropsTypes.string,
        airportId: PropsTypes.number,
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
                    <Link to={`/admin/airports/edit/${this.props.airportId}`}>
                        <div className="edit-button rounded non-selectable">
                            Edit
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Airport;