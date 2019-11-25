import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import Spinner from '../common/spinner';
import Book from './book';

import FlightObject from '../../services/flight-models/flight';

import * as CityService from '../../services/CityService';
import * as CountryService from '../../services/CountryService';
import * as AirportService from '../../services/AirportService';

import moment from 'moment';

export default function Flight(props) {
    const [loading, changeLoading] = useState(true);

    const [from, changeFrom] = useState();
    const [to, changeTo] = useState();

    const [totalCost, changeTotalCost] = useState(0);
    const [suitcaseOverloadCost, changeSuitcaseOverloadCost] = useState(0);
    const [handLuggageOverloadCost, changeHandLuggagOverloadCost] = useState(0);

    function calculateTotalCost() {
        let newTotalCost = props.books.reduce(
            (cost, book) => cost + book.cost,
            0
        )

        newTotalCost += props.flight.handLuggageOverloadCost;
        newTotalCost += props.flight.suitcaseOverloadCost;

        return newTotalCost;
    }

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

            changeTotalCost(calculateTotalCost());
            changeSuitcaseOverloadCost(props.flight.suitcaseOverloadCost);
            changeHandLuggagOverloadCost(props.flight.handLuggageOverloadCost);

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
                    <h5>
                        From: {from} <br/> To: {to}
                    </h5>
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
            <div className="row">
                <div className="col-6">
                    Suitcase overload cost: {suitcaseOverloadCost}$ <br/>
                    Hand luggage overload cost: {handLuggageOverloadCost}$
                </div>

                <div className="col-6">
                    Total cost: {totalCost}$
                </div>
            </div>
            <div className="row books">
                <div className="col-12">
                    {props.books.map((book, index) => 
                        <Book
                            book={book}
                            key={index}
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