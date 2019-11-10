import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ComponentHeadline from '../common/component-headline';
import Spinner from '../common/spinner';
import SeatTypes from './seat-types/seat-types';
import SeatScheme from './seat-scheme/seat-scheme';
import ChoosenSeats from './choosen-seats/choosen-seats';
import BaggageController from './baggage-controller';
import FinalButton from './final-button';
import CostLayout from './cost-layout';
import FlightInfo from './flight-info';
import MessageBox from '../common/message-box';
import { defaultErrorMessage } from '../common/message-box-messages';

import * as AirplaneService from '../../services/AirplaneService';
import * as FlightService from '../../services/FlightService';
import * as UserService from '../../services/UserSerivce'

import '../../styles/booking.css';

function Content(props) {
    const [loading, changeLoading] = useState(true);
    const [flight, changeFlight] = useState();
    const [airplane, changeAirplane] = useState();
    const [seatTypes, changeSeatTypes] = useState([]);
    const [seats, changeSeats] = useState([]);
    const [choosenSeats, changeChoosenSeats] = useState([]);
    const [suitcaseCount, changeSuitcaseCount] = useState(0);
    const [handLuggageCount, changeHandLuggageCount] = useState(0);
    const [messageBoxValue, changeMessageBoxValue] = useState(null);
    const [calculatePage, changeCalculatePage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const flight = await FlightService.getById(props.flightId);
                changeFlight(flight);

                const airplane = await AirplaneService.getById(flight.airplaneId);
                changeAirplane(airplane);

                const seatTypes = await AirplaneService.getAirplaneSeatTypes(flight.airplaneId);
                changeSeatTypes(seatTypes);

                const seats = await AirplaneService.getAirplaneSeats(flight.airplaneId);
                changeSeats(seats);

                changeLoading(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
        fetchData();
    }, [props.flightId]);

    function onSeatChoosen(seat) {
        let storage = choosenSeats.slice();

        storage.push(seat);

        changeChoosenSeats(storage);
    }

    function onSeatUnchoosen(seat) {
        let storage = [];

        for (let i = 0, len = choosenSeats.length; i < len; i++) {
            const element = choosenSeats[i];
            if (element.id !== seat.id) {
                storage.push(element);
            }
        }

        changeChoosenSeats(storage);
    }

    function calculateCost() {
        if (choosenSeats.length > 0) {
            changeCalculatePage(true);
        }
    }

    function onBookingConfirm() {
        // HTTP REQUEST
        props.history.push('/profile');
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
        return (
            <main className="rounded">
                {showMessageBox()}
                <Spinner headline="Loading..."/>
            </main>
        );
    }

    return (
        <main className="rounded">
            {showMessageBox()}
            <div className={`${!calculatePage}-visible`}>
                <ComponentHeadline content="Booking"/>
                <FlightInfo
                    airplaneName={airplane.name}
                    flight={flight}
                />
                <SeatScheme
                    seatInfo={seats}
                    seatTypes={seatTypes}
                    onSeatChoosen={onSeatChoosen}
                    onSeatUnchoosen={onSeatUnchoosen}
                />
                <div className="seat-types-baggage-container">
                    <SeatTypes seatTypes={seatTypes} flightId={flight.id}/>
                    <BaggageController
                        changeSuitcaseCount={changeSuitcaseCount}
                        suitcaseMass={flight.suitcaseMassKg}
                        suitcaseCount={flight.suitcaseCount}
                        changeHandLuggageCount={changeHandLuggageCount}
                        carryonCount={flight.handLuggageCount}
                        carryonMass={flight.handLuggageMassKg}
                    />
                </div>
                <ChoosenSeats
                    choosenSeats={choosenSeats}
                    seatTypes={seatTypes}
                />
                <FinalButton
                    type="calculate-cost"
                    content="Calculate the cost"
                    onClick={calculateCost}
                />
            </div>

            <div className={`${calculatePage}-visible`}>
                <CostLayout
                    flight={flight}
                    choosenSeats={choosenSeats}
                    suitcaseCount={suitcaseCount}
                    handLuggageCount={handLuggageCount}
                />
                <FinalButton
                    type="confirm-booking"
                    onClick={onBookingConfirm}
                    content="Confirm booking"
                />
                <FinalButton
                    type="change-options"
                    onClick={() => changeCalculatePage(false)}
                    content="Return back to options"
                />
            </div>
        </main>
    );
}

Content.propsTypes = {
    flightId: PropsTypes.number
}

export default withRouter(Content);