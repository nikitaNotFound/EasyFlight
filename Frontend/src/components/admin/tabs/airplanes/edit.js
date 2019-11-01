import React, { useState, useEffect } from 'react';

import Headline from '../../../common/headline';
import MessageBox from '../../../common/message-box';
import SeatEditor from './seat-editor';
import Spinner from '../../../common/spinner';

import Airplane from '../../../../services/airplane-models/airplane';

import * as AirplaneService from '../../../../services/AirplaneService';
import { invalidInput, defaultErrorMessage, saved, seatTypeInUse } from '../../../common/message-box-messages';
import ConfirmActionButton from '../../../common/confirm-action-button';
import { NotFoundError } from '../../../../services/RequestErrors';

export default function Edit(props) {
    const [loading, changeLoading] = useState(true);
    const [id, changeId] = useState();
    const [name, changeName] = useState('');
    const [carryingKg, changeCarryingKg] = useState(0);
    const [seats, changeSeats] = useState();
    const [seatTypes, changeSeatTypes] = useState();
    const [seatTypesToAdd, changeSeatTypesToAdd] = useState([]);
    const [seatTypesIdToDelete, changeSeatTypesIdToDelete] = useState([]);
    const [airplaneChangedMode, changeAirplaneChangedMode] = useState(false);
    const [seatsChangedMode, changeSeatsChangedMode] = useState(false);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
            Promise.all([
                AirplaneService.getById(props.match.params.id),
                AirplaneService.getAirplaneSeats(props.match.params.id),
                AirplaneService.getAirplaneSeatTypes(props.match.params.id)
            ]).then (values => {
                const [airplane, seats, seatTypes] = values;

                changeId(airplane.id);
                changeName(airplane.name);
                changeCarryingKg(airplane.carryingKg);

                changeSeats(seats);
                changeSeatTypes(seatTypes);

                changeLoading(false);
            }).catch(error => {
                if (error instanceof NotFoundError) {
                    props.history.push('/not-found');
                }
            })
        }
        fetchData();
    }, [props.match.params.id]);

    function onDataSave() {
        if (!name
            || !carryingKg
            || !seats
            || !seatTypes
        ) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        const seatTypesToAddPromises = seatTypesToAdd.length == 0
            ? []
            : seatTypesToAdd.map(seatType => AirplaneService.addAirplaneSeatType(id, seatType));

        Promise.all([...seatTypesToAddPromises])
            .then(() => {
                const getAddedSeatTypesPromises = seatTypesToAdd.map(
                    seatType => AirplaneService.getAirplaneSeatTypeByName(id, seatType.name)
                );
                return Promise.all([...getAddedSeatTypesPromises]);
            })
            .then(seatTypes => {
                let newSeats;
                for (let i = 0, len = seatTypes.length; i < len; i++) {
                    const seatType = seatTypes[i];

                    newSeats = seats.map(seat => {
                        if (seat.typeId == seatType.name) {
                            seat.typeId = seatType.id;
                            return seat;
                        } else {
                            return seat;
                        }
                    });
                }

                changeSeats(newSeats);
                return newSeats;
            })
            .then(newSeats => {
                const finalAirplane = new Airplane(id, name, carryingKg);

                const seatTypesToDeletePromises = seatTypesIdToDelete.length == 0
                    ? []
                    : seatTypesIdToDelete.map(seatTypeId => AirplaneService.deleteAirplaneSeatType(id, seatTypeId));

                const airpaneUpdatingPromise = airplaneChangedMode == false
                    ? []
                    : [AirplaneService.update(finalAirplane)];

                const seatsUpdatingPromise = seatsChangedMode == false
                    ? []
                    : [AirplaneService.updateAirplaneSeats(id, newSeats)]

                Promise.all([
                    ...airpaneUpdatingPromise,
                    ...seatsUpdatingPromise,
                    ...seatTypesToDeletePromises
                ]).then(() => {
                    changeMessageBoxValue(saved());
                })
            })
            .catch(() => {
                changeMessageBoxValue(defaultErrorMessage());
            })
    }

    function getSeatListFromSeatScheme(scheme) {
        let finalSeats = [];

        // getting all seats from scheme
        for (let floor = 0, len = scheme.length; floor < len; floor++) {
            const floorArray = scheme[floor];

            for (let section = 0, len = floorArray.length; section < len; section++) {
                const sectionArray = floorArray[section];

                for (let zone = 0, len = sectionArray.length; zone < len; zone++) {
                    const zoneArray = sectionArray[zone];

                    for (let row = 0, len = zoneArray.length; row < len; row++) {
                        const rowArray = zoneArray[row];
                    
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
        let seatTypesStorage = [];
        Object.assign(seatTypesStorage, seatTypes);

        seatTypesStorage.push(seatType);
        console.log(seatTypesStorage);
        changeSeatTypes(seatTypesStorage);

        let seatTypesToAddStorage = [];
        Object.assign(seatTypesToAddStorage, seatTypesToAdd);

        seatTypesToAddStorage.push(seatType);

        changeSeatTypesToAdd(seatTypesToAddStorage);
    }

    async function onTypeDeleted(index) {
        let seatTypesStorage = [];
        Object.assign(seatTypesStorage, seatTypes);

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

        let storage = [];
        Object.assign(storage, seatTypesIdToDelete);

        storage.push(seatTypeId);

        changeSeatTypesIdToDelete(storage);
    }

    function canDeleteSeatType(seats, seatTypeId) {
        let inUsed = false;

        for (let i = 0, len = seats.length; i < len; i++) {
            const el = seats[i];

            if (el.typeId === seatTypeId) {
                inUsed = true;
                break;
            }
        }

        return !inUsed;
    }

    function onSeatsChange(seats) {
        const seatList = getSeatListFromSeatScheme(seats);
        changeSeats(seatList);
        changeSeatsChangedMode(true);
    }

    function onCarryingChange(event) {
        const newCarrying = Number(event.target.value);
        if (newCarrying > 0) {
            changeCarryingKg(newCarrying);
            changeAirplaneChangedMode(true);
        }
    }

    function onNameChange(event) {
        changeName(event.target.value);
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

                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="airplane-name">
                                        Airplane name
                                    </label>
                                    <input
                                        id="airplane-name"
                                        type="text"
                                        value={name}
                                        onChange={onNameChange}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="airplane-max-mass">
                                        Max mass
                                    </label>
                                    <input
                                        id="airplane-max-mass"
                                        value={carryingKg}
                                        onChange={onCarryingChange}
                                    />
                                </div>
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
                <ConfirmActionButton onClick={onDataSave} buttonContent="Save"/>
                {showMessageBox()}
            </div>
        );
    }

    return <Spinner headline="Loading..."/>
}