import React, { useState, useEffect } from "react";
import PropsTypes from "prop-types";

import FlightObject from "../../services/flight-models/flight";

import LayoutHeadline from "./layout-headline";
import Spinner from "../common/spinner";

import * as PlaceService from "../../services/PlaceService";
import * as AirportService from "../../services/AirportService";

import moment from "moment";

export default function FlightInfo(props) {
    const [from, changeFrom] = useState(null);
    const [to, changeTo] = useState(null);
    const [formDate, changeFromDate] = useState(null);
    const [loading, changeLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [fromAirport, toAirport] = Promise.all([
                AirportService.getById(props.flight.fromId),
                AirportService.getById(props.flight.toId)
            ]);

            const [fromCity, toCity] = Promise.all([
                PlaceService.getCityById(fromAirport.cityId),
                PlaceService.getCityById(toAirport.cityId)
            ]);

            const [fromCountry, toCountry] = Promise.all([
                PlaceService.getCountryById(fromCity.countryId),
                PlaceService.getCountryById(toCity.countryId)
            ]);

            changeFrom(`${fromAirport.name} (${fromCity.name}, ${fromCountry.name})`);
            changeTo(`${toAirport.name} (${toCity.name}, ${toCountry.name})`);

            changeFromDate(
                moment(props.flight.departureTime, 'YYYY-MM-DD hh:mm').format('LLL')
            );

            changeLoading(false);
        };
        fetchData();
    });

    if (loading) {
        return (
            <div className="flight-info rounded">
                <Spinner headline="Loading..." />
            </div>
        );
    }

    return (
        <div className="flight-info rounded">
            <LayoutHeadline content="Flight info" />
            <div className="params-container">
                From: {from} <br/>
                To: {to} <br/>
            </div>

            <div className="params-container">
                Airplane name: {props.airplaneName} <br/>
                Departure time: {formDate} <br/>
            </div>
        </div>
    );
}

FlightInfo.propsTypes = {
    airplaneName: PropsTypes.string,
    flight: PropsTypes.instanceOf(FlightObject)
}; 