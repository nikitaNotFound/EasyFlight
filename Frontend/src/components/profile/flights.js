import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';
import Flight from './flight';
import Spinner from '../common/spinner';
import * as AirplaneService from '../../services/AirplaneService';
import * as FlightService from '../../services/FlightService';
import moment from 'moment';
import ConfirmActionButton from '../common/confirm-action-button';

function Flights(props) {
    const [loading, changeLoading] = useState(true);
    const [futureFlights, changeFutureFlights] = useState([]);
    const [pastFlights, changePastFlights] = useState([]);
    const [flightBooks, changeFlightBooks] = useState([]);
    const [showPastFlights, changeShowPastFlights] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let flightBooks = [];

            for (let accountFlightIndex = 0, len = props.accountFlights.length; accountFlightIndex < len; accountFlightIndex++) {
                const accountFlight = props.accountFlights[accountFlightIndex];
                
                const seatsInfo = await FlightService.getBookSeats(accountFlight.id);

                flightBooks[accountFlight.flightId] = seatsInfo;
            }

            changeFlightBooks(flightBooks);

            const flightsPromises = props.accountFlights.map(
                flight => FlightService.getById(flight.flightId)
            );

            const flights = await Promise.all([...flightsPromises]);

            const futureFlights = [];
            const pastFlights = [];

            for (let i = 0, len = flights.length; i < len; i++) {
                if (moment(flights[i].departureTime).local() < moment()) {
                    pastFlights.push(flights[i]);
                } else {
                    futureFlights.push(flights[i]);
                }

                const [suitcaseCost, handLuggageCost] = getAccountFlightOverloadCosts(flights[i].id);

                flights[i].suitcaseOverloadCost = suitcaseCost;
                flights[i].handLuggageOverloadCost = handLuggageCost;
            }

            changeFutureFlights(futureFlights);
            changePastFlights(pastFlights);
            changeLoading(false);
        }
        fetchData();
    }, [props.accountFlights]);

    function getAccountFlightOverloadCosts(flightId) {
        for (let i = 0, len = props.accountFlights.length; i < len; i++) {
            const flight = props.accountFlights[i];

            if (flight.flightId == flightId) {
                return [flight.suitcaseOverloadCost, flight.handLuggageOverloadCost];
            }
        }

        return [0, 0];
    }

    if (loading) {
        return (
            <div className="flight-history-list">
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    if (showPastFlights === true) {
        return (
            <div className="flight-history-list">
                <ConfirmActionButton
                    buttonContent="Show future flights"
                    onClick={() => changeShowPastFlights(false)}
                />
                {pastFlights.map(
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

    return (
        <div className="flight-history-list">
            <ConfirmActionButton
                buttonContent="Show past flights"
                onClick={() => changeShowPastFlights(true)}
            />
            {futureFlights.map(
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
    accountFlights: PropsTypes.array
}

export default Flights;