import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import FlightObject from '../../services/flight-models/flight';

import LayoutHeadline from './layout-headline';
import Spinner from '../common/spinner';
import MessageBox from '../common/message-box';

import * as CountryService from '../../services/CountryService';
import * as CityService from '../../services/CityService';
import * as AirportService from '../../services/AirportService';

import moment from 'moment';
import { defaultErrorMessage } from '../common/message-box-messages';

export default function FlightInfo(props) {
    const [from, changeFrom] = useState(null);
    const [to, changeTo] = useState(null);
    const [departureTime, changeDepartureTime] = useState(null);
    const [arrivalTime, changeArrivalTime] = useState(null);
    const [loading, changeLoading] = useState(true);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fromAirport, toAirport] = await Promise.all([
                    AirportService.getById(props.flight.fromAirportId),
                    AirportService.getById(props.flight.toAirportId)
                ]);

                const [fromCity, toCity] = await Promise.all([
                    CityService.getById(fromAirport.cityId),
                    CityService.getById(toAirport.cityId)
                ]);

                const [fromCountry, toCountry] = await Promise.all([
                    CountryService.getById(fromCity.countryId),
                    CountryService.getById(toCity.countryId)
                ]);

                changeFrom(`${fromAirport.name} (${fromCity.name}, ${fromCountry.name})`);
                changeTo(`${toAirport.name} (${toCity.name}, ${toCountry.name})`);

                changeDepartureTime(
                    moment(props.flight.departureTime, 'YYYY-MM-DD hh:mm').format('LLL')
                );

                changeArrivalTime(
                    moment(props.flight.arrivalTime, 'YYYY-MM-DD hh:mm').format('LLL')
                );

                changeLoading(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        };
        fetchData();
    });

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    changeMessageBoxValue={changeMessageBoxValue}
                />
            );
        }
    }

    if (loading) {
        return (
            <div className="flight-info rounded">
                {showMessageBox()}
                <Spinner headline="Loading..." />
            </div>
        );
    }

    return (
        <div className="flight-info rounded">
            {showMessageBox()}
            <LayoutHeadline content="Flight info" />
            <div className="params-container">
                From: {from} <br/>
                To: {to} <br/>
            </div>

            <div className="params-container">
                Departure time: {departureTime} <br/>
                Arrival time: {arrivalTime} <br/>
            </div>

            <div className="params-container">
                Airplane name: {props.airplaneName} <br/>
            </div>
        </div>
    );
}

FlightInfo.propsTypes = {
    airplaneName: PropsTypes.string,
    flight: PropsTypes.instanceOf(FlightObject)
}; 