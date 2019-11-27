import React, { useState } from 'react';

import Headline from '../../../common/headline';
import SeatEditor from './seat-editor';
import MessageBox from '../../../common/message-box';
import ParamField from '../../../common/param-field';

import Airplane from '../../../../services/airplane-models/airplane';

import * as AirplaneService from '../../../../services/AirplaneService';
import { invalidInput, added, defaultErrorMessage, seatTypeInUse, duplicate } from '../../../common/message-box-messages';
import ConfirmActionButton from '../../../common/confirm-action-button';
import { BadRequestError } from '../../../../services/RequestErrors';

export default function Add() {
    const [name, changeName] = useState();
    const [carryingKg, changeCarryingKg] = useState(0);
    const [seats, changeSeats] = useState();
    const [seatTypes, changeSeatTypes] = useState([]);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    async function onDataSave() {
        if (!name
            || !carryingKg
            || !seats
            || !seatTypes
        ) {
            changeMessageBoxValue(invalidInput());
            return;
        }


        const airplane = new Airplane(null, name, carryingKg);

        try {
            const addedAirplane = await AirplaneService.add(airplane);
            const addedAirplaneId = addedAirplane.id;

            const seatTypesToAddPromises = seatTypes.map(
                seatType => AirplaneService.addAirplaneSeatType(addedAirplaneId, seatType)
            );

            const seatTypesIds = await Promise.all([...seatTypesToAddPromises]);

            let newSeats = seats.slice();

            for (let i = 0, len = seatTypesIds.length; i < len; i++) {
                const seatTypeId = seatTypesIds[i].id;
                const seatTypeName = seatTypes[i].name;

                for (let seatIndex = 0, len = newSeats.length; seatIndex < len; seatIndex++) {
                    const seat = newSeats[seatIndex];

                    if (seat.typeId == seatTypeName) {
                        seat.typeId = seatTypeId;
                        seat.airplaneId = addedAirplaneId;
                    }
                }
            }


            await AirplaneService.updateAirplaneSeats(addedAirplaneId, newSeats);

            changeMessageBoxValue(added());
        }
        catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate(name));
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    function getSeatListFromSeatScheme(scheme) {
        let finalSeats = [];

        // getting all seats from scheme
        for (let floor = 0, len = scheme.length; floor < len; floor++) {
            const floorArray = scheme[floor];

            if (!floorArray) {
                continue;
            }

            for (let section = 0, len = floorArray.length; section < len; section++) {
                const sectionArray = floorArray[section];

                if (!sectionArray) {
                    continue;
                }

                for (let zone = 0, len = sectionArray.length; zone < len; zone++) {
                    const zoneArray = sectionArray[zone];

                    for (let row = 0, len = zoneArray.length; row < len; row++) {
                        const rowArray = zoneArray[row];
                    
                        for (let number = 0, len = rowArray.length; number < len; number++) {
                            const rowItem = rowArray[number];

                            if (rowItem != null) {
                                finalSeats.push(rowItem);
                            }
                        }
                    }
                }
            }
        }

        return finalSeats;
    }

    async function onTypeAdded(seatType) {
        let seatTypesStorage = seatTypes.slice();

        seatTypesStorage.push(seatType);

        changeSeatTypes(seatTypesStorage);
    }

    async function onTypeDeleted(index) {
        let seatTypesStorage = seatTypes.slice();

        const seatTypeId = seatTypesStorage[index].id;

        if (!canDeleteSeatType(seats, seatTypeId)) {
            changeMessageBoxValue(seatTypeInUse());
            return;
        }

        seatTypesStorage.splice(index, 1);

        if (seatTypesStorage.length == 0) {
            seatTypesStorage = [];
        }

        changeSeatTypes(seatTypesStorage);
    }

    function canDeleteSeatType(seats, seatTypeId) {
        let inUse = false;

        for (let i = 0, len = seats.length; i < len; i++) {
            const el = seats[i];

            if (el.typeId === seatTypeId) {
                inUse = true;
                break;
            }
        }

        return !inUse;
    }

    function onSeatsChange(seats) {
        const seatList = getSeatListFromSeatScheme(seats);
        changeSeats(seatList);
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
        <div className="list-item-action adding">
            <Headline name="Adding new airplane"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <ParamField
                                    name="Airplane name"
                                    value={name}
                                    onChange={changeName}
                                    inputType="text"
                                />
                                <ParamField
                                    name="Max mass"
                                    value={carryingKg}
                                    onChange={changeCarryingKg}
                                    inputType="text"
                                />
                            </div>
                        </div>
                        <br/>
                        <SeatEditor 
                            seatInfo={seats}
                            seatTypes={seatTypes}
                            onSeatsChange={onSeatsChange}
                            onSeatTypesChange={changeSeatTypes}
                            onTypeAdded={onTypeAdded}
                            onTypeDeleted={onTypeDeleted}
                        />
                    </div>
                </div>
            </div>
            <ConfirmActionButton onClick={onDataSave} buttonContent="Add"/>
            {showMessageBox()}
        </div>
    );
}