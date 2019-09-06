import React, {useState, useEffect} from 'react';
import Headline from '../../../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import TicketsCostEditor from './tickets-cost-editor';
import Flight from '../../../../services/flight-models/flight';
import * as AirportService from '../../../../services/AirportService';
import * as AirplaneService from '../../../../services/AirplaneService';

function Adding() {
    const [airplane, changeAirplane] = useState();

    const [fromPlace, changeFromPlace] = useState();

    const [toPlace, changeToPlace] = useState();

    const [desc, changeDesc] = useState();

    const [departureTime, changeDepartureTime] = useState();
    const [departureDate, changeDepartureDate] = useState();

    const [departureBackTime, changeDepartureBackTime] = useState();
    const [departureBackDate, changeDepartureBackDate] = useState();

    const [ticketsCost, changeTicketsCost] = useState();

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onAirplaneChange(airplane) {
        changeAirplane(airplane);
    }

    function onFromPlaceChange(event) {
        changeFromPlace(event.target.value);
    }

    function onToPlaceChange(event) {
        changeToPlace(event.target.value);
    }

    function onDepartureTimeChange(event) {
        changeDepartureTime(event.target.value);
    }

    function onDepartureDateChange(event) {
        changeDepartureDate(event.target.value);
    }

    function onDepartureBackTimeChange(event) {
        changeDepartureBackTime(event.target.value);
    }

    function onDepartureBackDateChange(event) {
        changeDepartureBackDate(event.target.value);
    }

    function onTypeCostChange(newTypesCost) {
        changeTicketsCost(newTypesCost);
    }

    function onDescChange(event) {
        changeDesc(event.target.value);
    }

    function onDataSave() {
        if (!departureDate 
            || !departureBackDate 
            || !departureTime 
            || !departureBackTime 
            || !fromPlace 
            || !toPlace 
            || !airplane 
            || !ticketsCost
            || !desc
        ) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        const departureTime = `${departureDate} ${departureTime}`;
        const departureBackTime = `${departureBackDate} ${departureBackTime}`;

        const newFlight = 
            new Flight(
                null,
                fromPlace.id,
                toPlace.id,
                departureTime,
                departureBackTime,
                desc,
                airplane.id
            );
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
                seatTypes={airplane.seatTypes}
                onTypeCostChange={onTypeCostChange}
            />
        );
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={hideMessageBox}
                />
            );
        }
    }

    function hideMessageBox() {
        changeMessageBoxValue(null);
    }

    return (
        <div className="list-item-action">
            <Headline name="Adding new flight"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-2">
                        <input
                            type="file"
                            name="image"
                            id="file-input"
                            className="file-upload"
                        />
                        <label htmlFor="file-input">
                            <img src={BuyIcon} className="adding-form-img" alt="add"/>
                        </label>
                    </div>
                    <div className="col-10">
                        <div className="editing-params-form">
                            <div className="row">
                                <SearchList
                                    searchFunc={AirportService.search}
                                    getItemName={getAirportName}
                                    onValueChange={onFromPlaceChange}
                                    currentItem={fromPlace}
                                    placeholder="From"
                                />
                                <SearchList
                                    searchFunc={AirportService.search}
                                    getItemName={getAirportName}
                                    onValueChange={onToPlaceChange}
                                    currentItem={toPlace}
                                    placeholder="To"
                                />
                                <SearchList
                                    searchFunc={AirplaneService.search}
                                    getItemName={getAirplaneName}
                                    onValueChange={onAirplaneChange}
                                    currentItem={airplane}
                                    placeholder="airplane"
                                />

                                <div className="adding-form-section">
                                    <div className="row">
                                        <div className="form-item">
                                            <label htmlFor="dep-time">
                                                Departure time
                                            </label>
                                            <input
                                                id="dep-time"
                                                onChange={onDepartureTimeChange}
                                                type="time"
                                            />
                                        </div>
                                        <div className="form-item tabulation">
                                            <label htmlFor="dep-date">
                                                Departure date
                                            </label>
                                            <input
                                                id="dep-date"
                                                onChange={onDepartureDateChange}
                                                type="date"
                                            />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="dep-back-time">
                                                Departure back time
                                            </label>
                                            <input
                                                id="dep-back-time"
                                                onChange={onDepartureBackTimeChange}
                                                type="time"
                                            />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="dep-back-date">
                                                Departure back date
                                            </label>
                                            <input
                                                id="dep-back-date"
                                                onChange={onDepartureBackDateChange}
                                                type="date"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {showTicketsCostEditor()}
                                <div className="adding-form-section">
                                    <textarea
                                        placeholder="description"
                                        value={desc}
                                        onChange={onDescChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="custom-button big" onClick={onDataSave}>
                            Save
                        </div>
                    </div>
                </div>
            </div>
            {showMessageBox()}
        </div>
    );
}

export default Adding;