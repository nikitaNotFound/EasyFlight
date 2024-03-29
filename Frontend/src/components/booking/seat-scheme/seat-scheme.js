import React, {useState} from 'react';
import PropsTypes from 'prop-types';

import SeatFloor from './seat-floor';
import LayoutHeadline from '../layout-headline';

import '../../../styles/seat-editor.css';


function initializeSeatArray(props) {
    if (!props.seatInfo) {
        return null;
    }

    const storage = props.seatInfo.slice();

    let seatsArray = [];

    // in this for' block program sets up a multi-array divided into the sections (floor, section, zone, row)
    for (let i = 0, len = storage.length; i < len; i++) {
        const element = storage[i];
        if (!seatsArray[element.floor - 1]) {
            seatsArray[element.floor - 1] = [];
        }
        if (!seatsArray[element.floor - 1][element.section - 1]) {
            seatsArray[element.floor - 1][element.section - 1] = [];
        }
        if (!seatsArray[element.floor - 1][element.section - 1][element.zone - 1]) {
            seatsArray[element.floor - 1][element.section - 1][element.zone - 1] = [];
        }
        if (!seatsArray[element.floor - 1][element.section - 1][element.zone - 1][element.row - 1]) {
            seatsArray[element.floor - 1][element.section - 1][element.zone - 1][element.row - 1] = [];
        }
        seatsArray[element.floor - 1][element.section - 1][element.zone - 1][element.row - 1][element.number - 1] = element;

        for (let i = 0, len = props.choosenSeats.length; i < len; i++) {
            const choosenSeat = props.choosenSeats[i];

            if (choosenSeat.id == element.id) {
                element.choosen = true;
            }
        }

        for (let i = 0, len = props.bookedSeats.length; i < len; i++) {
            const bookedSeat = props.bookedSeats[i];

            if (bookedSeat.seatId == element.id) {
                element.booked = true;
            }
        }
    }

   return seatsArray;
}

export default function SeatScheme(props) {
    const [seatArray, changeSeatArray] = useState(initializeSeatArray(props));
    const [seatTypes, changeSeatTypes] = useState(props.seatTypes);

    return (
        <div className="seat-scheme rounded">
            <LayoutHeadline content="Seats scheme"/>
            {seatArray.map(
                (seats, index) => {
                    let placeInfo = {};
                    placeInfo.floor = index + 1;
                    return (
                        <SeatFloor
                            placeInfo={placeInfo}
                            seats={seats}
                            seatTypes={seatTypes}
                            onSeatChoosen={props.onSeatChoosen}
                            onSeatUnchoosen={props.onSeatUnchoosen}
                            key={index + 1}
                        />
                    );
                }
            )}
        </div>
    );
}

SeatScheme.propsTypes = {
    seatInfo: PropsTypes.array,
    seatTypes: PropsTypes.array,
    onSeatChoosen: PropsTypes.func,
    onSeatUnchoosen: PropsTypes.func,
    choosenSeats: PropsTypes.array,
    bookedSeats: PropsTypes.array
}