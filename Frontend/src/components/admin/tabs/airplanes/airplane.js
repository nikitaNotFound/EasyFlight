import React, {Component} from 'react';
import AirplaneHeadline from './airplane-headline';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Airplane extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        seatCount: PropsTypes.number,
        carrying: PropsTypes.number,
        airplaneId: PropsTypes.number,
    }

    render () {
        return (
            <div className="row rounded list-item">
                <div className="col-2">
                    <img src="" className="list-item-img" alt="airport"/>
                </div>

                <div className="col-9">
                    <AirplaneHeadline 
                        name={this.props.name}
                        seatCount={`${this.props.seatCount} seats`}
                    />
                    {`max mass = ${this.props.carrying}kg`}
                </div>

                <div className="col-1">
                    <Link to={`/admin/airplanes/edit/${this.props.airplaneId}`}>
                        <div className="edit-button rounded non-selectable">
                            Edit
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Airplane;