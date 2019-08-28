import React from 'react';
import Icon from '../../icons/test-company-2.jpg';
import PropsTypes from 'prop-types';
import FlightObject from '../../services/flight-models/flight';

function Flight (props) {
    function getTimeString (dateInfo) {
        let date = new Date(dateInfo);

        return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} | ${date.getHours()}:${date.getMinutes()}`;
    }

    console.log(props.flight);
    return (
        <div className="flight-history-item">
            <div className="row">
                <div className="col-1">
                    <img src={Icon} className="item-image"/>
                </div>

                <div className="col-4">
                    <div className="container-fluid">
                        <h5>From: {props.flight.from} To: {props.flight.to}</h5>
                    </div>

                    <div className="container-fluid">
                        {props.flight.desc}
                    </div>
                </div>

                <div className="col-7">
                    Departure time: {getTimeString(props.flight.departureTime)}
                    <br/>
                    Departure back time: {getTimeString(props.flight.departureBackTime)}
                </div>
            </div>
        </div>
    );
}

Flight.propsTypes = {
    flight: PropsTypes.instanceOf(FlightObject)
}

export default Flight;