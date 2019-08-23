import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SeatFloor from './seat-floor';
import Instruments from './seat-editor-instruments';
import Seat from '../../../../services/airplane-models/seat';
import seatTypes from '../../../../services/airplane-models/seat-types';

/******************************************INIZIALIZE FUNCTIONS***************************************************/
function initializeSeatArray(props) {
    if (props.seatInfo === undefined) {
        return undefined;
    }

    const storage = [];
    Object.assign(storage, props.seatInfo);

    let seatsArray = [];

    //in this for' block program sets up a multi-array divided into the sections (floor, section, row, string)
    for (let i = 0, len = storage.length; i < len; i++) {
        const element = storage[i];
        if (seatsArray[element.floor - 1] === undefined) {
            seatsArray[element.floor - 1] = [];
        }
        if (seatsArray[element.floor - 1][element.section - 1] === undefined) {
            seatsArray[element.floor - 1][element.section - 1] = [];
        }
        if (seatsArray[element.floor - 1][element.section - 1][element.row - 1] === undefined) {
            seatsArray[element.floor - 1][element.section - 1][element.row - 1] = [];
        }
        if (seatsArray[element.floor - 1][element.section - 1][element.row - 1][element.string - 1] === undefined) {
            seatsArray[element.floor - 1][element.section - 1][element.row - 1][element.string - 1] = [];
        }
        seatsArray[element.floor - 1][element.section - 1][element.row - 1][element.string - 1][element.number - 1] = element;
    }

   return seatsArray;
}

/*************************************************COMPONENT********************************************************/
function SeatEditor (props) {
    const [seatArray, changeSeatArray] = useState(initializeSeatArray(props));

    /****************************************EVENTS********************************************************/
    //calls when user press add row
    function onAddRow (floor, section) {
        let storage = [];
        Object.assign(storage, seatArray);
        
        //if there no floor with getted number, programm will add it
        if (storage[floor - 1] === undefined) {
            storage[floor - 1] = [];
        }
        //if there no sector with getted number, programm will add it
        if (storage[floor - 1][section - 1] === undefined) {
            storage[floor - 1][section - 1] = [];
        }
        const newRow = storage[floor - 1][section - 1].length + 1;
        const newSeat = new Seat(floor, section, newRow, 1, 1, seatTypes.economClass);

        storage[floor - 1][section - 1][newRow - 1] = [];
        storage[floor - 1][section - 1][newRow - 1][0] = [];
        storage[floor - 1][section - 1][newRow - 1][0].push(newSeat);

        changeSeatArray(storage);
    }

    //calls when user press save
    function onDataSave () {
        props.onDataSave(seatArray);
    }

    /****************************************RENDER********************************************************/
    //returns at the start; when user adds something, program will call the second return' block
    if (!seatArray) {
        return (
        <div className="seat-editor">
            <Instruments onAddRow={onAddRow} onDataSave={props.onDataSave}/>

            <div className="custom-button big" onClick={onDataSave}>Save</div>
        </div>
        );
    }

    return (
        <div className="seat-editor">
            <Instruments onAddRow={onAddRow} onDataSave={props.onDataSave}/>

            <div className="seat-editor-layout">
                {seatArray.map(
                    (item, index) => {
                        let placeInfo = {};
                        placeInfo.floor = index + 1;
                        return (<SeatFloor placeInfo={placeInfo} seats={item} key={index + 1}/>);
                    }
                )}
            </div>
            <div className="custom-button big" onClick={onDataSave}>Save</div>
        </div>
    );

}

SeatEditor.propsTypes = {
    onDataSave: PropsTypes.func,
    seatInfo: PropsTypes.array
}

export default SeatEditor;