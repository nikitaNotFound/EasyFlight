import React, { useState, useEffect } from "react";
import Icon from "../../icons/test-company-2.jpg";
import PropsTypes from "prop-types";
import FlightObject from "../../services/flight-models/flight";
import * as PlaceService from "../../services/PlaceService";
import * as AirportService from "../../services/AirportService";
import Spinner from "../common/spinner";
import moment from "moment";

function Flight(props) {
    const [loading, changeLoading] = useState(true);

    const [from, changeFrom] = useState();
    const [to, changeTo] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const [fromAirport, toAirport] = await Promise.all([
                AirportService.getById(props.flight.fromId),
                AirportService.getById(props.flight.toId)
            ]);

            const [fromCity, toCity] = await Promise.all([
                PlaceService.getCityById(fromAirport.cityId),
                PlaceService.getCityById(toAirport.cityId)
            ]);

            const [fromCountry, fromCountry] = await Promise.all([
                PlaceService.getCountryById(fromCity.countryId),
                PlaceService.getCountryById(toCity.countryId)
            ]);

            changeFrom(`${fromAirport.name} (${fromCity.name}, ${fromCountry.name})`);
            changeTo(`${toAirport.name} (${toCity.name}, ${toCountry.name})`);
            changeLoading(false);
        };
        fetchData();
    }, [props.flight]);

    function getTimeString(dateInfo) {
        let date = moment(dateInfo);

        return moment(date, "YYYY-MM-DD hh:mm").format("LLL");
    }

    if (loading) {
        return <Spinner headline="Loading..." />;
    }

    return (
        <div className="flight-history-item">
            <div className="row">
                <div className="col-1">
                    <img src={Icon} alt="company-icon" className="item-image" />
                </div>

                <div className="col-4">
                    <div className="container-fluid">
                        <h5>
                            From: {from} To: {to}
                        </h5>
                    </div>

                    <div className="container-fluid">{props.flight.desc}</div>
                </div>

                <div className="col-7">
                    Departure time: {getTimeString(props.flight.departureTime)}
                    <br />
                    Departure back time: {getTimeString(props.flight.departureBackTime)}
                </div>
            </div>
        </div>
    );
}

Flight.propsTypes = {
    flight: PropsTypes.instanceOf(FlightObject)
};

export default Flight;
