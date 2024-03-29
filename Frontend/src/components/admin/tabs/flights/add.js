import React, {useState} from 'react';

import moment from 'moment';

import Headline from '../../../common/headline';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import TicketsCostEditor from './tickets-cost-editor';
import Flight from '../../../../services/flight-models/flight';
import ParamField from '../../../common/param-field';

import { invalidInput, defaultErrorMessage, added, flightTimeError } from '../../../common/message-box-messages';
import ConfirmActionButton from '../../../common/confirm-action-button';

import * as AirportService from '../../../../services/AirportService';
import * as AirplaneService from '../../../../services/AirplaneService';
import * as FlightService from '../../../../services/FlightService';
import { BadRequestError } from '../../../../services/RequestErrors';

export default function Add() {
    const [airplane, changeAirplane] = useState();

    const [fromAirport, changeFromAirport] = useState();
    const [toAirport, changeToAirport] = useState();

    const [departureDate, changeDepartureDate] = useState();
    const [departureTime, changeDepartureTime] = useState();

    const [arrivalDate, changeArrivalDate] = useState();
    const [arrivalTime, changeArrivalTime] = useState();

    const [ticketsCost, changeTicketsCost] = useState();

    const [suitcaseMassKg, changeSuitcaseMassKg] = useState(0);
    const [suitcaseCount, changeSuitcaseCount] = useState(0);

    const [handLuggageMassKg, changeHandLuggageMassKg] = useState(0);
    const [handLuggageCount, changeHandLuggageCount] = useState(0);

    const [overloadKgCost, changeOverloadKgCost] = useState(0);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onDataSave(event) {
        event.preventDefault();
        if (!departureDate
            || !departureTime
            || !fromAirport
            || !toAirport
            || !airplane
            || !ticketsCost
            || !overloadKgCost
        ) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        let departureDateTime = `${departureDate} ${departureTime}`;
        departureDateTime = moment(departureDateTime).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');

        let arrivalDateTime = `${arrivalDate} ${arrivalTime}`;
        arrivalDateTime = moment(arrivalDateTime).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');

        const newFlight = new Flight(
            null,
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
            const addedFlightId = await FlightService.add(newFlight)

            const ticketCostAddPromises = ticketsCost.map(ticketCost => FlightService.addTicketCost(addedFlightId.id, ticketCost));

            await Promise.all([...ticketCostAddPromises]);

            changeMessageBoxValue(added());
        } catch(ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(flightTimeError());
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    function getAirplaneName(airplane) {
        return airplane.name;
    }

    function getAirportName(airport) {
        return airport.name;
    }

    function showTicketsCostEditor() {
        if (airplane) {
            return (
                <TicketsCostEditor
                    airplaneId={airplane.id}
                    onTypeCostChange={changeTicketsCost}
                />
            );
        }
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    return (
        <div className="list-item-action">
            <Headline name="Adding new flight"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={onDataSave}>
                            <div className="editing-params-form flight-editor">
                                <div className="row">
                                    <div className="adding-form-section date-time">
                                        <div className="row">
                                            <ParamField
                                                name="Departure time"
                                                value={departureTime}
                                                onChange={changeDepartureTime}
                                                inputType="time"
                                                required
                                            />
                                            <ParamField
                                                name="Departure date"
                                                value={departureDate}
                                                onChange={changeDepartureDate}
                                                inputType="date"
                                                required
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
                                                required
                                            />
                                            <ParamField
                                                name="Arrival date"
                                                value={arrivalDate}
                                                onChange={changeArrivalDate}
                                                inputType="date"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <SearchList
                                        searchFunc={AirportService.searchByName}
                                        getItemName={getAirportName}
                                        onValueChange={changeFromAirport}
                                        currentItem={fromAirport}
                                        placeholder="From"
                                        required
                                    />
                                    <SearchList
                                        searchFunc={AirplaneService.searchWithParams}
                                        searchArgs={[true]}
                                        getItemName={getAirplaneName}
                                        onValueChange={changeAirplane}
                                        currentItem={airplane}
                                        placeholder="airplane"
                                        required
                                    />
                                    <SearchList
                                        searchFunc={AirportService.searchByName}
                                        getItemName={getAirportName}
                                        onValueChange={changeToAirport}
                                        currentItem={toAirport}
                                        placeholder="To"
                                        required
                                    />

                                    {showTicketsCostEditor()}

                                    <div className="adding-form-section">
                                        <div className="row">
                                            <ParamField
                                                name="Suitcase mass"
                                                value={suitcaseMassKg}
                                                onChange={changeSuitcaseMassKg}
                                                required
                                            />
                                            <ParamField
                                                name="Suitcase count"
                                                value={suitcaseCount}
                                                onChange={changeSuitcaseCount}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="adding-form-section">
                                        <div className="row">
                                            <ParamField
                                                name="Hand luggage mass"
                                                value={handLuggageMassKg}
                                                onChange={changeHandLuggageMassKg}
                                                required
                                            />
                                            <ParamField
                                                name="Hand luggage count"
                                                value={handLuggageCount}
                                                onChange={changeHandLuggageCount}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="adding-form-section">
                                        <div className="row">
                                            <ParamField
                                                name="Overload kg cost"
                                                value={overloadKgCost}
                                                onChange={changeOverloadKgCost}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ConfirmActionButton buttonContent="Add"/>
                        </form>
                    </div>
                </div>
            </div>
            {showMessageBox()}
        </div>
    );
}