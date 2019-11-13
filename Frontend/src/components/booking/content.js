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
import FlightBookInfo from '../../services/flight-models/flight-book-info';
import BookCostInfo from '../../services/flight-models/book-cost-info';
import SeatBookInfo from '../../services/flight-models/seat-book-info';

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
    const [bookedSeats, changeBookedSeats] = useState([]);
    const [bookCost, changeBookCost] = useState(new BookCostInfo());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [flight, bookedSeats] = await Promise.all([
                    FlightService.getById(props.flightId),
                    FlightService.getFlightBookedSeats(props.flightId)
                ]);
                changeFlight(flight);
                changeBookedSeats(bookedSeats);

                const [airplane, seatTypes, seats] = await Promise.all([
                    AirplaneService.getById(flight.airplaneId),
                    AirplaneService.getAirplaneSeatTypes(flight.airplaneId),
                    AirplaneService.getAirplaneSeats(flight.airplaneId)
                ]);
                changeAirplane(airplane);
                changeSeatTypes(seatTypes);
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

    async function onBookForTime() {
        const seatsBookInfo = choosenSeats.map(
            seat => new SeatBookInfo(seat.id, bookCost.seatsCost[seat.id])
        );

        const bookInfo = new FlightBookInfo(
            flight.id,
            bookCost.suitcaseOverloadCost,
            bookCost.handLuggageOverloadCost,
            seatsBookInfo
        );

        try {
            const book = await FlightService.bookForTime(bookInfo);
            onBookPayed(book.id);
        } catch {
            changeMessageBoxValue(defaultErrorMessage());
        }
    }

    function onBookPayed(bookId) {
        setTimeout(async () => {
            try {
                await FlightService.finalBook(bookId, 'transaction');
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }, 5000);
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

    if (calculatePage) {
        return (
            <main className="rounded">
                {showMessageBox()}
                <CostLayout
                    flight={flight}
                    choosenSeats={choosenSeats}
                    suitcaseCount={suitcaseCount}
                    handLuggageCount={handLuggageCount}
                    changeBookCostInfo={changeBookCost}
                />
                <FinalButton
                    type="confirm-booking"
                    onClick={onBookForTime}
                    content="Confirm booking"
                />
                <FinalButton
                    type="change-options"
                    onClick={() => changeCalculatePage(false)}
                    content="Return back to options"
                />
            </main>
        );
    }

    return (
        <main className="rounded">
            {showMessageBox()}
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
                choosenSeats={choosenSeats}
                bookedSeats={bookedSeats}
            />
            <div className="seat-types-baggage-container">
                <SeatTypes seatTypes={seatTypes} flightId={flight.id}/>
                <BaggageController
                    changeSuitcaseCount={changeSuitcaseCount}
                    suitcaseMass={flight.suitcaseMassKg}
                    suitcaseCount={flight.suitcaseCount}
                    suitcaseCountValue={suitcaseCount}
                    changeHandLuggageCount={changeHandLuggageCount}
                    handLuggageCount={flight.handLuggageCount}
                    handLuggageMass={flight.handLuggageMassKg}
                    handLuggageCountValue={handLuggageCount}
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
        </main>
    );
}

Content.propsTypes = {
    flightId: PropsTypes.number
}

export default withRouter(Content);