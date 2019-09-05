import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SeatFloor from './seat-floor';
import Instruments from './seat-editor-instruments';
import SeatTypesEditor from './seat-type-editor';
import Seat from '../../../../services/airplane-models/seat';

function initializeSeatArray(props) {
    if (!props.seatInfo) {
        return null;
    }

    const storage = [];
    Object.assign(storage, props.seatInfo);

    let seatsArray = [];

    //in this for' block program sets up a multi-array divided into the sections (floor, section, zone, row)
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

function getSeatTypes(props) {
    if(props.seatTypes) {
        return props.seatTypes;
    }

    return [];
}

function SeatEditor(props) {
    const [seatArray, changeSeatArray] = useState(initializeSeatArray(props));
    const [seatTypes, changeSeatTypes] = useState(getSeatTypes(props));

    //calls when user press add zone
    function onAddZone(floor, section) {
        let storage = [];
        Object.assign(storage, seatArray);
        
        //if there no floor with getted number, programm will add it
        if (!storage[floor - 1]) {
            storage[floor - 1] = [];
        }
        //if there no sector with getted number, programm will add it
        if (!storage[floor - 1][section - 1]) {
            storage[floor - 1][section - 1] = [];
        }
        const newZone = storage[floor - 1][section - 1].length + 1;
        const newSeat = new Seat(floor, section, newZone, 1, 1, 1);

        storage[floor - 1][section - 1][newZone - 1] = [];
        storage[floor - 1][section - 1][newZone - 1][0] = [];
        storage[floor - 1][section - 1][newZone - 1][0].push(newSeat);

        changeSeatArray(storage);
        props.onSeatsChange(storage);
    }

    //calls when user press add type
    function onAddType(newType) {
        let storage = [];
        Object.assign(storage, seatTypes);

        storage.push(newType);
        changeSeatTypes(storage);
        props.onSeatTypesChange(storage);
    }

    //calls when user press delete type
    function onTypeDelete(id) {
        let storage = [];
        Object.assign(storage, seatTypes);

        storage.splice(id, 1);

        if(storage.length == 0) {
            storage = null;
        }

        changeSeatTypes(storage);
        props.onSeatTypesChange(storage);
    }

    //returns at the start; when user adds something, program will call the second return' block
    function showSeatTypesInstruments() {
        if(seatTypes.length > 0) {
            return (
                <Instruments onAddZone={onAddZone} onDataSave={props.onDataSave}/>
            );
        }
    }

    function showSeatsSheme() {
        if(seatArray) {
            return (
                <div className="seat-editor-layout">
                    {seatArray.map(
                        (seats, index) => {
                            let placeInfo = {};
                            placeInfo.floor = index + 1;
                            return (
                                <SeatFloor
                                    placeInfo={placeInfo}
                                    seats={seats}
                                    seatTypes={seatTypes}
                                    key={index + 1}/>
                            );
                        }
                    )}
                </div>
            );
        }
    }

    return (
        <div className="seat-editor">
            <SeatTypesEditor seatTypes={seatTypes} onAddType={onAddType} onTypeDelete={onTypeDelete}/>
            {showSeatTypesInstruments()}
            {showSeatsSheme()}
        </div>
    );

}

SeatEditor.propsTypes = {
    seatInfo: PropsTypes.array,
    seatTypes: PropsTypes.array,
    onSeatsChange: PropsTypes.func,
    onSeatTypesChange: PropsTypes.func
}

export default SeatEditor;