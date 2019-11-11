import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';
import Flight from './flight';
import Spinner from '../common/spinner';
import * as AirplaneService from '../../services/AirplaneService';
import * as FlightService from '../../services/FlightService';

function checkIdUnique(array, id) {
    for(let i = 0, len = array.length; i < len; i++) {
        if (array[i] == id) {
            return false;
        }
    }

    return true;
}

function Flights(props) {
    const [loading, changeLoading] = useState(true);
    const [flights, changeFlights] = useState([]);
    const [flightBooks, changeFlightBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let flightIds = [];
            let flightBooks = [];

            for (let accountBookIndex = 0, len = props.accountBooks.length; accountBookIndex < len; accountBookIndex++) {
                const accountBook = props.accountBooks[accountBookIndex];

                if (checkIdUnique(flightIds, accountBook.flightId)) {
                    flightIds.push(accountBook.flightId);
                }

                const seatInfo = await AirplaneService.getSeatById(accountBook.seatId);
                
                if (!Array.isArray(flightBooks[accountBook.flightId])) {
                    flightBooks[accountBook.flightId] = [];
                }

                flightBooks[accountBook.flightId].push(seatInfo);
            }

            changeFlightBooks(flightBooks);

            const flightsPromises = flightIds.map(
                flightId => FlightService.getById(flightId)
            );

            const flights = await Promise.all([...flightsPromises]);

            changeFlights(flights);
            changeLoading(false);
        }
        fetchData();
    }, [props.accountBooks]);

    if (loading) {
        return (
            <div className="flight-history-list">
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    return (
        <div className="flight-history-list">
            {flights.map(
                (flight, index) =>
                    <Flight
                        flight={flight}
                        books={flightBooks[flight.id]}
                        key={index}
                    />
            )}
        </div>
    );
}

Flights.propsTypes = {
    accountBooks: PropsTypes.array
}

export default Flights;