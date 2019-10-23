import React, {useState, useEffect} from 'react';

import moment from 'moment';

import Headline from '../../../common/headline';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import Spinner from '../../../common/spinner';
import TicketsCostEditor from './tickets-cost-editor';
import ParamField from './param-field';
import ConfirmActionButton from '../../../common/confirm-action-button';

import BuyIcon from '../../../../icons/add-image.png';

import Flight from '../../../../services/flight-models/flight';
import { invalidInput } from '../../../common/message-box-messages';

import * as AirplaneService from '../../../../services/AirplaneService';
import * as FlightService from '../../../../services/FlightService';
import * as AirportService from '../../../../services/AirportService';

export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);

    const [flight, changeFlight] = useState();

    const [airplane, changeAirplane] = useState();

    const [fromPlace, changeFromPlace] = useState();

    const [toPlace, changeToPlace] = useState();

    const [desc, changeDesc] = useState();

    const [departureTime, changeDepartureTime] = useState();
    const [departureDate, changeDepartureDate] = useState();

    const [ticketsCost, changeTicketsCost] = useState();

    const [suitcaseMass, changeSuitcaseMass] = useState(0);
    const [suitcaseCount, changeSuitcaseCount] = useState(0);

    const [carryonMass, changeCarryonMass] = useState(0);
    const [carryonCount, changeCarryonCount] = useState(0);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const flight = await FlightService.getById(props.match.params.id);

            changeFlight(flight);

            changeDepartureTime(flight.departureTime);
            changeDepartureDate(flight.departureDate);

            changeSuitcaseMass(flight.suitcaseMass);
            changeSuitcaseCount(flight.suitcaseCount);

            changeCarryonMass(flight.carryonMass);
            changeCarryonCount(flight.carryonCount);

            changeDesc(flight.desc);

            const [airplane, airports] = Promise.all([
                AirplaneService.getById(flight.airplaneId),
                Promise.all([
                    AirportService.getById(flight.fromId),
                    AirportService.getById(flight.toId)
                ])
            ]);

            changeAirplane(airplane);

            const [from, to] = airports;

            changeFromPlace(from);
            changeToPlace(to);

            changeLoadingMode(false);
        };
        fetchData();
    }, [props.match.params.id]);

    function onDataSave() {
        if (!departureDate
            || !departureTime
            || !fromPlace
            || !toPlace
            || !airplane
            || !ticketsCost
            || !desc
        ) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        const newFlight = new Flight(
            null,
            fromPlace.id,
            toPlace.id,
            departureTime,
            departureDate,
            desc,
            airplane.id,
            airplane.seats.length,
            suitcaseMass,
            suitcaseCount,
            carryonMass,
            carryonCount
        );
    }

    function getAirplaneName(airplane) {
        return airplane.name;
    }

    function getAirportName(airport) {
        return airport.name;
    }

    function getTicketsCostEditor() {
        if (!airplane) {
            return;
        }

        return (
            <TicketsCostEditor
                seatTypes={airplane.seatTypes}
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
                    <div className="col-2">
                        <input type="file" name="image" id="file-input" className="file-upload" />
                        <label htmlFor="file-input">
                            <img
                                src={BuyIcon}
                                className="adding-form-img"
                                alt="add"
                            />
                        </label>
                    </div>
                    <div className="col-10">
                        <div className="editing-params-form">
                            <div className="row">
                                <SearchList
                                    searchFunc={AirportService.searchByName}
                                    getItemName={getAirportName}
                                    onValueChange={changeFromPlace}
                                    currentItem={fromPlace}
                                    placeholder="From"
                                />
                                <SearchList
                                    searchFunc={AirportService.searchByName}
                                    getItemName={getAirportName}
                                    onValueChange={changeToPlace}
                                    currentItem={toPlace}
                                    placeholder="To"
                                />
                                <SearchList
                                    searchFunc={AirplaneService.searchWithParams}
                                    getItemName={getAirplaneName}
                                    onValueChange={changeAirplane}
                                    currentItem={airplane}
                                    placeholder="airplane"
                                />

                                {getTicketsCostEditor()}

                                <div className="adding-form-section">
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

                                <div className="adding-form-section">
                                    <div className="row">
                                        <ParamField
                                            name="Suitcase mass"
                                            value={suitcaseMass}
                                            onChange={changeSuitcaseMass}
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
                                            name="Carryon mass"
                                            value={carryonMass}
                                            onChange={changeCarryonMass}
                                        />
                                        <ParamField
                                            name="Carryon count"
                                            value={carryonCount}
                                            onChange={changeCarryonCount}
                                        />
                                    </div>
                                </div>

                                <div className="adding-form-section">
                                    <textarea placeholder="description" value={desc} onChange={changeDesc} />
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