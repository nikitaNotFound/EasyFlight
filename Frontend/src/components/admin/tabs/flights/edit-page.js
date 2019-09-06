import React, {useState, useEffect} from 'react';
import Headline from '../../../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import Spinner from '../../../common/spinner';
import TicketsCostEditor from './tickets-cost-editor';
import * as AirplaneService from '../../../../services/AirplaneService';
import * as FlightService from '../../../../services/FlightService';
import * as AirportService from '../../../../services/AirportService';
import Flight from '../../../../services/flight-models/flight';

function Editing (props) {
    const [loading, changeLoadingMode] = useState(true);

    const [flight, changeFlight] = useState();

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

    useEffect (() => {
        const flightLoading = FlightService.getById(props.match.params.id);

        flightLoading
            .then(flight => {
                changeFlight(flight);

                const [toDate, toTime] = flight.departureTime.split(' ');
                changeDepartureTime(toTime);
                changeDepartureDate(toDate);

                const [fromDate, fromTime] = flight.departureBackTime.split(' ');
                changeDepartureBackTime(fromTime);
                changeDepartureBackDate(fromDate);

                changeDesc(flight.desc);

                const airplaneLoading = AirplaneService.getById(flight.airplaneId);
                const airportsLoading = AirportService.getByIds([flight.fromId, flight.toId]);

                return Promise.all([airplaneLoading, airportsLoading])
            })
            .then(data => {
                const [airplane, airports] = data;
                
                changeAirplane(airplane);

                const [from, to] = airports;

                changeFromPlace(from);
                changeToPlace(to);

                changeLoadingMode(false);
            })
            .catch(error => {
                alert(error);
            });
    }, [props.match.params.id]);

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

        const finalDepartureTime = `${departureDate} ${departureTime}`;
        const finalDepartureBackTime = `${departureBackDate} ${departureBackTime}`;

        const newFlight = 
            new Flight(
                null,
                fromPlace.id,
                toPlace.id,
                finalDepartureTime,
                finalDepartureBackTime,
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
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    if (loading) {
        return <Spinner headline="Loading..."/>
    }

    return (
        <div className="list-item-action editing">
            <Headline name="Editing flight"/>

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

                                <div className="adding-form-section">
                                    <div className="row">
                                        <div className="form-item">
                                            <label htmlFor="dep-time">
                                                Departure time
                                            </label>
                                            <input 
                                                id="dep-time"
                                                onChange={(event) => changeDepartureTime(event.target.value)}
                                                value={departureTime}
                                                type="time"
                                            />
                                        </div>
                                        <div className="form-item tabulation">
                                            <label htmlFor="dep-date">
                                                Departure date
                                            </label>
                                            <input
                                                id="dep-date"
                                                onChange={(event) => changeDepartureDate(event.target.value)}
                                                value={departureDate}
                                                type="date"
                                            />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="dep-back-time">
                                                Departure back time
                                            </label>
                                            <input
                                                id="dep-back-time"
                                                onChange={(event) => changeDepartureBackTime(event.target.value)}
                                                value={departureBackTime}
                                                type="time"
                                            />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="dep-back-date">
                                                Departure back date
                                            </label>
                                            <input
                                                id="dep-back-date"
                                                onChange={(event) => changeDepartureBackTime(event.target.value)}
                                                value={departureBackDate}
                                                type="date"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {getTicketsCostEditor()}
                                <div className="adding-form-section">
                                    <textarea
                                        placeholder="description"
                                        value={desc}
                                        onChange={changeDesc}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-button big" onClick={onDataSave}>
                    Save
                </div>
            </div>
            {showMessageBox()}
        </div>
    );
}

export default Editing;