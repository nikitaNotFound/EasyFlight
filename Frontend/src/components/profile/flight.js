import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import Spinner from '../common/spinner';
import Book from './book';

import FlightObject from '../../services/flight-models/flight';

import * as CityService from '../../services/CityService';
import * as CountryService from '../../services/CountryService';
import * as AirportService from '../../services/AirportService';

import Icon from '../../icons/test-company-2.jpg';

import moment from 'moment';

export default function Flight(props) {
    const [loading, changeLoading] = useState(true);

    const [from, changeFrom] = useState();
    const [to, changeTo] = useState();

    useEffect(() => {
        const fetchData = async () => {
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
            changeLoading(false);
        };
        fetchData();
    }, [props.flight]);

    function getTimeString(dateInfo) {
        let date = moment(dateInfo);

        return moment(date, 'YYYY-MM-DD hh:mm').format('LLL');
    }

    if (loading) {
        return <Spinner headline="Loading..." />;
    }

    return (
        <div className="flight-history-item">
            <div className="row">
                <div className="col-5">
                    <div className="container-fluid">
                        <h5>
                            From: {from} <br/> To: {to}
                        </h5>
                    </div>

                    <div className="container-fluid">{props.flight.desc}</div>
                </div>

                <div className="col-7">
                    <div className="time-info">
                        Departure time: {getTimeString(props.flight.departureTime)}
                    </div>
                    <div className="time-info">
                        Arrival time: {getTimeString(props.flight.arrivalTime)}
                    </div>
                </div>
            </div>
            <div className="row books">
                <div className="col-12">
                    {props.books.map(book => 
                        <Book
                            book={book}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

Flight.propsTypes = {
    flight: PropsTypes.instanceOf(FlightObject),
    books: PropsTypes.array
};