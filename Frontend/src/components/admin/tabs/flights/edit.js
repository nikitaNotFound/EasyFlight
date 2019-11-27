import React, {useState, useEffect} from 'react';

import moment from 'moment';

import Headline from '../../../common/headline';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import Spinner from '../../../common/spinner';
import TicketsCostEditor from './tickets-cost-editor';
import ParamField from '../../../common/param-field';
import ConfirmActionButton from '../../../common/confirm-action-button';

import Flight from '../../../../services/flight-models/flight';
import { invalidInput, defaultErrorMessage, flightTimeError, saved } from '../../../common/message-box-messages';

import * as AirplaneService from '../../../../services/AirplaneService';
import * as FlightService from '../../../../services/FlightService';
import * as AirportService from '../../../../services/AirportService';
import { BadRequestError } from '../../../../services/RequestErrors';

export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);

    const [flight, changeFlight] = useState();

    const [airplane, changeAirplane] = useState();

    const [fromAirport, changeFromAirport] = useState();

    const [toAirport, changeToAirport] = useState();

    const [departureTime, changeDepartureTime] = useState();
    const [departureDate, changeDepartureDate] = useState();

    const [arrivalTime, changeArrivalTime] = useState();
    const [arrivalDate, changeArrivalDate] = useState();

    const [ticketsCost, changeTicketsCost] = useState();

    const [suitcaseMassKg, changeSuitcaseMassKg] = useState(0);
    const [suitcaseCount, changeSuitcaseCount] = useState(0);

    const [handLuggageMassKg, changeHandLuggageMassKg] = useState(0);
    const [handLuggageCount, changeHandLuggageCount] = useState(0);

    const [overloadKgCost, changeOverloadKgCost] = useState(0);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const flight = await FlightService.getById(props.match.params.id);

            changeFlight(flight);

            changeDepartureDate(moment(flight.departureTime).format('YYYY-M-DD'));
            changeDepartureTime(moment(flight.departureTime).format('HH:mm'));

            changeArrivalDate(moment(flight.arrivalTime).format('YYYY-M-DD'));
            changeArrivalTime(moment(flight.arrivalTime).format('HH:mm'));

            changeSuitcaseMassKg(flight.suitcaseMassKg);
            changeSuitcaseCount(flight.suitcaseCount);

            changeHandLuggageMassKg(flight.handLuggageMassKg);
            changeHandLuggageCount(flight.handLuggageCount);

            changeOverloadKgCost(flight.massOverloadKgCost
                );

            const [airplane, fromAirport, toAirport] = await Promise.all([
                AirplaneService.getById(flight.airplaneId),
                AirportService.getById(flight.fromAirportId),
                AirportService.getById(flight.toAirportId)
            ]);

            changeAirplane(airplane);

            changeFromAirport(fromAirport);
            changeToAirport(toAirport);

            changeLoadingMode(false);
        };
        fetchData();
    }, [props.match.params.id]);

    async function onDataSave() {
        if (!departureDate
            || !departureTime
            || !fromAirport
            || !toAirport
            || !airplane
            || !ticketsCost
        ) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        let departureDateTime = `${departureDate} ${departureTime}`;
        departureDateTime = moment(departureDateTime).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');

        let arrivalDateTime = `${arrivalDate} ${arrivalTime}`;
        arrivalDateTime = moment(arrivalDateTime).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');

        const newFlight = new Flight(
            flight.id,
            fromAirport.id,
            toAirport.id,
            departureDateTime,
            arrivalDateTime,
            airplane.id,
            suitcaseMassKg,
            suitcaseCount,
            handLuggageMassKg,
            handLuggageCount,
            overloadKgCost
        );

        try {
            const seatTypesCostUpdatePromises = ticketsCost.map(
                cost => FlightService.updateTicketCost(flight.id, cost)
            );

            await Promise.all([
                FlightService.update(newFlight),
                ...seatTypesCostUpdatePromises
            ]);
            changeMessageBoxValue(saved());
        } catch(ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(flightTimeError());
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    function getAirportName(airport) {
        return airport.name;
    }

    function showTicketsCostEditor() {
        if (!airplane) {
            return;
        }

        return (
            <TicketsCostEditor
                airplaneId={airplane.id}
                flightId={flight.id}
                onTypeCostChange={changeTicketsCost}
            />
        );
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return <MessageBox message={messageBoxValue} hideFunc={changeMessageBoxValue} />;
        }
    }

    if (loading) {
        return <Spinner headline="Loading..." />;
    }

    return (
        <div className="list-item-action editing">
            <Headline name="Editing flight" />

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form flight-editor">
                            <div className="row">
                            <div className="adding-form-section date-time">
                                    <div className="row">
                                        <ParamField
                                            name="Departure time"
                                            value={departureTime}
                                            onChange={changeDepartureTime}
                                            inputType="time"
                                        />
                                        <ParamField
                                            name="Departure date"
                                            value={departureDate}
                                            onChange={changeDepartureDate}
                                            inputType="date"
                                        />
                                    </div>
                                </div>

                                <div className="adding-form-section date-time arrival">
                                    <div className="row">
                                        <ParamField
                                            name="Arrival time"
                                            value={arrivalTime}
                                            onChange={changeArrivalTime}
                                            inputType="time"
                                        />
                                        <ParamField
                                            name="Arrival date"
                                            value={arrivalDate}
                                            onChange={changeArrivalDate}
                                            inputType="date"
                                        />
                                    </div>
                                </div>

                                <SearchList
                                    searchFunc={AirportService.searchByName}
                                    getItemName={getAirportName}
                                    onValueChange={changeFromAirport}
                                    currentItem={fromAirport}
                                    placeholder="From"
                                />
                                <div className="form-item">
                                    <label htmlFor={"airplane"}>Airplane</label>
                                    <input
                                        id="airplane"
                                        className="search-list-input"
                                        type="text"
                                        value={airplane.name}
                                        readOnly
                                    />
                                </div>
                                <SearchList
                                    searchFunc={AirportService.searchByName}
                                    getItemName={getAirportName}
                                    onValueChange={changeToAirport}
                                    currentItem={toAirport}
                                    placeholder="To"
                                />

                                {showTicketsCostEditor()}

                                <div className="adding-form-section">
                                    <div className="row">
                                        <ParamField
                                            name="Suitcase mass"
                                            value={suitcaseMassKg}
                                            onChange={changeSuitcaseMassKg}
                                        />
                                        <ParamField
                                            name="Suitcase count"
                                            value={suitcaseCount}
                                            onChange={changeSuitcaseCount}
                                        />
                                    </div>
                                </div>

                                <div className="adding-form-section">
                                    <div className="row">
                                        <ParamField
                                            name="Hand luggage mass"
                                            value={handLuggageMassKg}
                                            onChange={changeHandLuggageMassKg}
                                        />
                                        <ParamField
                                            name="Hand luggage count"
                                            value={handLuggageCount}
                                            onChange={changeHandLuggageCount}
                                        />
                                    </div>
                                </div>

                                <div className="adding-form-section">
                                    <div className="row">
                                        <ParamField
                                            name="Overload kg cost"
                                            value={overloadKgCost}
                                            onChange={changeOverloadKgCost}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmActionButton onClick={onDataSave} buttonContent="Save"/>
            </div>
            {showMessageBox()}
        </div>
    );
}