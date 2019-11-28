import React, { useState, useEffect } from 'react';

import Headline from '../../../common/headline';
import MessageBox from '../../../common/message-box';
import SeatEditor from './seat-editor';
import Spinner from '../../../common/spinner';

import Airplane from '../../../../services/airplane-models/airplane';

import * as AirplaneService from '../../../../services/AirplaneService';
import { invalidInput, defaultErrorMessage, saved, seatTypeInUse, duplicate } from '../../../common/message-box-messages';
import ConfirmActionButton from '../../../common/confirm-action-button';
import { NotFoundError, BadRequestError } from '../../../../services/RequestErrors';
import ParamField from '../../../common/param-field';

export default function Edit(props) {
    const [loading, changeLoading] = useState(true);
    const [id, changeId] = useState();
    const [name, changeName] = useState();
    const [carryingKg, changeCarryingKg] = useState(0);
    const [seats, changeSeats] = useState();
    const [seatTypes, changeSeatTypes] = useState();
    const [seatTypesToAdd, changeSeatTypesToAdd] = useState([]);
    const [seatTypesIdToDelete, changeSeatTypesIdToDelete] = useState([]);
    const [airplaneChangedMode, changeAirplaneChangedMode] = useState(false);
    const [seatsChangedMode, changeSeatsChangedMode] = useState(false);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useEffect(() => {
        Promise.all([
            AirplaneService.getById(props.match.params.id),
            AirplaneService.getAirplaneSeats(props.match.params.id),
            AirplaneService.getAirplaneSeatTypes(props.match.params.id)
        ])
        .then (values => {
            const [airplane, seats, seatTypes] = values;

            changeId(airplane.id);
            changeName(airplane.name);
            changeCarryingKg(airplane.carryingKg);

            changeSeats(seats);
            changeSeatTypes(seatTypes);

            changeLoading(false);
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                props.history.push('/not-found');
            }
        })
    }, [props.match.params.id]);

    async function onDataSave() {
        if (!name
            || !carryingKg
            || !seats
            || !seatTypes
        ) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        try {
            const seatTypesToAddPromises = seatTypesToAdd.length == 0
                ? []
                : seatTypesToAdd.map(seatType => AirplaneService.addAirplaneSeatType(id, seatType));

            const addedSeatTypes = await Promise.all([...seatTypesToAddPromises])

            let newSeats = seats.slice();

            for (let i = 0, len = addedSeatTypes.length; i < len; i++) {
                const seatType = addedSeatTypes[i];

                for (let seatIndex = 0, len = seats.length; i < len; i++) {
                    const seat = seats[seatIndex];

                    if (seat.typeId == seatType.name) {
                        seat.typeId = seatType.id;
                    }
                }
            }

            const finalAirplane = new Airplane(id, name, carryingKg);

            const seatTypesToDeletePromises = seatTypesIdToDelete.length == 0
                ? []
                : seatTypesIdToDelete.map(seatTypeId => AirplaneService.deleteAirplaneSeatType(id, seatTypeId));

            const airpaneUpdatingPromise = airplaneChangedMode === false
                ? []
                : [AirplaneService.update(finalAirplane)];

            const seatsUpdatingPromise = seatsChangedMode === false
                ? []
                : [AirplaneService.updateAirplaneSeats(id, newSeats)]

            await Promise.all([
                ...airpaneUpdatingPromise,
                ...seatsUpdatingPromise,
                ...seatTypesToDeletePromises
            ]);

            changeMessageBoxValue(saved());
        } catch (ex) {
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
                        
                        // checks if row empty
                        if (!rowArray) {
                            break;
                        }
                    
                        for (let number = 0, len = rowArray.length; number < len; number++) {
                            const rowItem = rowArray[number];

                            if (rowItem != null) {
                                rowItem.airplaneId = id;
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

        let seatTypesToAddStorage = seatTypesToAdd.slice();

        seatTypesToAddStorage.push(seatType);

        changeSeatTypesToAdd(seatTypesToAddStorage);
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

        let storage = seatTypesIdToDelete.slice();

        storage.push(seatTypeId);

        changeSeatTypesIdToDelete(storage);
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
        changeSeatsChangedMode(true);
    }

    function onCarryingChange(newCarrying) {
        changeCarryingKg(newCarrying);
        changeAirplaneChangedMode(true);
    }

    function onNameChange(newName) {
        changeName(newName);
        changeAirplaneChangedMode(true);
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

    if (!loading) {
        return (
            <div className="list-item-action editing">
                <Headline name="Editing airplane"/>

                <form onSubmit={onDataSave}>
                    <div className="row">
                            <div className="col-12">
                                <div className="editing-params-form">
                                    <div className="row">
                                        <ParamField
                                            name="Airplane name"
                                            value={name}
                                            onChange={onNameChange}
                                            inputType="text"
                                            required
                                        />
                                        <ParamField
                                            name="Max mass"
                                            value={carryingKg}
                                            onChange={onCarryingChange}
                                            inputType="number"
                                            required
                                            min={1}
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
                            <ConfirmActionButton buttonContent="Save"/>
                    </div>
                </form>
                {showMessageBox()}
            </div>
        );
    }

    return <Spinner headline="Loading..."/>
}