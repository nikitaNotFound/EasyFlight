import React, {useState} from 'react';

import moment from 'moment';

import Headline from '../../../common/headline';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import TicketsCostEditor from './tickets-cost-editor';
import Flight from '../../../../services/flight-models/flight';
import ParamFiled from './param-field';

import { invalidInput, defaultErrorMessage, added } from '../../../common/message-box-messages';
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

    const [suitcaseMass, changeSuitcaseMass] = useState(0);
    const [suitcaseCount, changeSuitcaseCount] = useState(0);

    const [carryonMass, changeCarryonMass] = useState(0);
    const [carryonCount, changeCarryonCount] = useState(0);

    const [overloadKgCost, changeOverloadKgCost] = useState(0);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onDataSave() {
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
            arrivalDateTime,
            departureDateTime,
            airplane.id,
            suitcaseMass,
            suitcaseCount,
            carryonMass,
            carryonCount,
            overloadKgCost
        );

        try {
            const addedFlightId = await FlightService.add(newFlight)

            const ticketCostAddPromises = ticketsCost.map(ticketCost => FlightService.addTicketCost(addedFlightId.id, ticketCost));

            await Promise.all([...ticketCostAddPromises]);

            changeMessageBoxValue(added());
        } catch {
            changeMessageBoxValue(defaultErrorMessage());
        }
    }

    function getAirplaneName(airplane) {
        return airplane.name;
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
                onTypeCostChange={changeTicketsCost}
            />
        );
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
                        <div className="editing-params-form flight-editor">
                            <div className="row">
                                <div className="adding-form-section date-time">
                                    <div className="row">
                                        <ParamFiled
                                            name="Departure time"
                                            value={departureTime}
                                            onChange={changeDepartureTime}
                                            inputType="time"
                                        />
                                        <ParamFiled
                                            name="Departure date"
                                            value={departureDate}
                                            onChange={changeDepartureDate}
                                            inputType="date"
                                        />
                                    </div>
                                </div>

                                <div className="adding-form-section date-time arrival">
                                    <div className="row">
                                        <ParamFiled
                                            name="Arrival time"
                                            value={arrivalTime}
                                            onChange={changeArrivalTime}
                                            inputType="time"
                                        />
                                        <ParamFiled
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
                                <SearchList
                                    searchFunc={AirplaneService.searchWithParams}
                                    searchArgs={[true]}
                                    getItemName={getAirplaneName}
                                    onValueChange={changeAirplane}
                                    currentItem={airplane}
                                    placeholder="airplane"
                                />
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
                                        <ParamFiled
                                            name="Suitcase mass"
                                            value={suitcaseMass}
                                            onChange={changeSuitcaseMass}
                                        />
                                        <ParamFiled
                                            name="Suitcase count"
                                            value={suitcaseCount}
                                            onChange={changeSuitcaseCount}
                                        />
                                    </div>
                                </div>

                                <div className="adding-form-section">
                                    <div className="row">
                                        <ParamFiled
                                            name="Carryon mass"
                                            value={carryonMass}
                                            onChange={changeCarryonMass}
                                        />
                                        <ParamFiled
                                            name="Carryon count"
                                            value={carryonCount}
                                            onChange={changeCarryonCount}
                                        />
                                    </div>
                                </div>

                                <div className="adding-form-section">
                                    <div className="row">
                                        <ParamFiled
                                            name="Overload kg cost"
                                            value={overloadKgCost}
                                            onChange={changeOverloadKgCost}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ConfirmActionButton onClick={onDataSave} buttonContent="Add"/>
                    </div>
                </div>
            </div>
            {showMessageBox()}
        </div>
    );
}