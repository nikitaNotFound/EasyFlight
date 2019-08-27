import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SeatFloor from './seat-floor';
import Instruments from './seat-editor-instruments';
import SeatTypesEditor from './seat-type-editor';
import Seat from '../../../../services/airplane-models/seat';

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

function SeatEditor (props) {
    const [seatArray, changeSeatArray] = useState(initializeSeatArray(props));
    const [seatTypes, changeSeatTypes] = useState(props.seatTypes);

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
        const newSeat = new Seat(floor, section, newRow, 1, 1, 0);

        storage[floor - 1][section - 1][newRow - 1] = [];
        storage[floor - 1][section - 1][newRow - 1][0] = [];
        storage[floor - 1][section - 1][newRow - 1][0].push(newSeat);

        changeSeatArray(storage);
    }

    //calls when user press add type
    function onAddType (newType) {
        let storage = [];
        Object.assign(storage, seatTypes);

        storage.push(newType);
        console.log(1);
        changeSeatTypes(storage);
        console.log(storage);
    }

    //calls when user press delete type
    function onTypeDelete (id) {
        let storage = [];
        Object.assign(storage, seatTypes);

        storage.splice(id, 1);

        if(storage.length == 0) {
            storage = undefined;
        }

        changeSeatTypes(storage);
    }

    //calls when user press save
    function onDataSave () {
        props.onDataSave(seatArray);
    }

    //returns at the start; when user adds something, program will call the second return' block
    if (!seatTypes) {
        return (
            <div className="seat-editor">
                <SeatTypesEditor seatTypes={seatTypes} onAddType={onAddType} onTypeDelete={onTypeDelete}/>
                <Instruments onAddRow={onAddRow} onDataSave={props.onDataSave}/>

                <div className="custom-button big" onClick={onDataSave}>Save</div>
            </div>
        );
    }

    if (!seatArray) {
        return (
            <div className="seat-editor">
                <SeatTypesEditor seatTypes={seatTypes} onAddType={onAddType} onTypeDelete={onTypeDelete}/>
                <Instruments onAddRow={onAddRow} onDataSave={props.onDataSave}/>

                <div className="custom-button big" onClick={onDataSave}>Save</div>
            </div>
        );
    }

    return (
        <div className="seat-editor">
            <SeatTypesEditor seatTypes={seatTypes} onAddType={onAddType} onTypeDelete={onTypeDelete}/>
            <Instruments onAddRow={onAddRow} onDataSave={props.onDataSave}/>

            <div className="seat-editor-layout">
                {seatArray.map(
                    (item, index) => {
                        let placeInfo = {};
                        placeInfo.floor = index + 1;
                        return (
                            <SeatFloor
                                placeInfo={placeInfo}
                                seats={item}
                                seatTypes={seatTypes}
                                key={index + 1}/>
                        );
                    }
                )}
            </div>
            <div className="custom-button big" onClick={onDataSave}>Save</div>
        </div>
    );

}

SeatEditor.propsTypes = {
    onDataSave: PropsTypes.func,
    seatInfo: PropsTypes.array,
    seatTypes: PropsTypes.array
}

export default SeatEditor;