import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import SeatFloor from './seat-floor';
import Instruments from './seat-editor-instruments';
import SeatTypesEditor from './seat-type-editor';

import Seat from '../../../../services/airplane-models/seat';

import '../../../../styles/seat-editor.css';

function initializeSeatArray(props) {
    if (!props.seatInfo) {
        return [];
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
    }

    return seatsArray;
}

export default function SeatEditor(props) {
    const [seatArray, changeSeatArray] = useState(initializeSeatArray(props));

    // calls when user press add zone
    function onAddZone(floor, section) {
        let storage = seatArray.slice();

        // if there no floor with getted number, programm will add it
        if (!storage[floor - 1]) {
            storage[floor - 1] = [];
        }
        // if there no sector with getted number, programm will add it
        if (!storage[floor - 1][section - 1]) {
            storage[floor - 1][section - 1] = [];
        }
        const newZone = storage[floor - 1][section - 1].length + 1;
        // row, number setted as 1, because 1 is start value
        // typeId setted as first element of seatTypes
        // I use seatType name beacause I can be sure that it is unique
        const newSeat = new Seat(null, null,  floor, section, newZone, 1, 1, props.seatTypes[0].name);

        storage[floor - 1][section - 1][newZone - 1] = [];
        storage[floor - 1][section - 1][newZone - 1][0] = [];
        storage[floor - 1][section - 1][newZone - 1][0].push(newSeat);

        changeSeatArray(storage);
        props.onSeatsChange(storage);
    }

    function onZoneChange(floor, section, zone, zoneArray) {
        let storage = seatArray.slice();

        storage[floor - 1][section - 1][zone - 1] = zoneArray;

        changeSeatArray(storage);
        props.onSeatsChange(storage);
    }

    function showSeatTypesInstruments() {
        if (props.seatTypes.length > 0) {
            return <Instruments onAddZone={onAddZone} />;
        }
    }

    function showSeatsScheme() {
        if (seatArray && props.seatTypes.length > 0) {
            return (
                <div className="seat-editor-layout">
                    {seatArray.map((seats, index) => {
                        let placeInfo = {};
                        placeInfo.floor = index + 1;
                        return (
                            <SeatFloor
                                placeInfo={placeInfo}
                                seats={seats}
                                seatTypes={props.seatTypes}
                                onZoneChange={onZoneChange}
                                key={index + 1}
                            />
                        );
                    })}
                </div>
            );
        }
    }

    return (
        <div className="seat-editor">
            <SeatTypesEditor seatTypes={props.seatTypes} onAddType={props.onTypeAdded} onTypeDelete={props.onTypeDeleted} />
            {showSeatTypesInstruments()}
            {showSeatsScheme()}
        </div>
    );
}

SeatEditor.propsTypes = {
    seatInfo: PropsTypes.array,
    seatTypes: PropsTypes.array,
    onSeatsChange: PropsTypes.func,
    onSeatTypesChange: PropsTypes.func,
    onTypeAdded: PropsTypes.func,
    onTypeDeleted: PropsTypes.func
};