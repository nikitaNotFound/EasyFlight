import React, {useState} from 'react';

import Headline from '../../../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import TicketsCostEditor from './tickets-cost-editor';
import Flight from '../../../../services/flight-models/flight';
import ParamFiled from './param-field';

import * as AirportService from '../../../../services/AirportService';
import * as AirplaneService from '../../../../services/AirplaneService';

export default function AddPage() {
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

    function onDataSave() {
        if (!departureDate 
            || !departureTime 
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

        const newFlight = 
            new Flight(
                null,
                fromPlace.id,
                toPlace.id,
                departureTime,
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

    function showTicketsCostEditor() {
        if (!airplane) {
            return;
        }

        return (
            <TicketsCostEditor
                seatTypes={airplane.seatTypes}
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
                    <div className="col-2">
                        <input
                            type="file"
                            name="image"
                            id="file-input"
                            className="file-upload"
                        />
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
                                    searchFunc={AirportService.search}
                                    getItemName={getAirportName}
                                    onValueChange={changeFromPlace}
                                    currentItem={fromPlace}
                                    placeholder="From"
                                />
                                <SearchList
                                    searchFunc={AirportService.search}
                                    getItemName={getAirportName}
                                    onValueChange={changeToPlace}
                                    currentItem={toPlace}
                                    placeholder="To"
                                />
                                <SearchList
                                    searchFunc={AirplaneService.search}
                                    getItemName={getAirplaneName}
                                    onValueChange={changeAirplane}
                                    currentItem={airplane}
                                    placeholder="airplane"
                                />

                                {showTicketsCostEditor()}

                                <div className="adding-form-section">
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
                                    <textarea
                                        placeholder="description"
                                        value={desc}
                                        onChange={(event) => changeDesc(event.target.value)}
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