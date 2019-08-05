import React, {Component} from 'react';
import FlightHeadline from './flight-headline';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Airport extends Component {
    static propsTypes = {
        from: PropsTypes.string,
        to: PropsTypes.string,
        cost: PropsTypes.number,
        desc: PropsTypes.string,
        flightId: PropsTypes.number,
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
                    <FlightHeadline 
                        from={this.props.from}
                        to={this.props.to}
                        cost={this.props.cost}
                    />
                    {this.props.desc}
                </div>

                <div className="col-1">
                    <Link to={`/admin/flights/edit/${this.props.flightId}`}>
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