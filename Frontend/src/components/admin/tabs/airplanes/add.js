import React, { useState } from 'react';

import Headline from '../../../common/headline';
import SeatEditor from './seat-editor';
import MessageBox from '../../../common/message-box';

import Airplane from '../../../../services/airplane-models/airplane';
import { invalidInput } from '../../../common/message-box-messages';

export default function Add() {
    const [name, changeName] = useState('');
    const [carrying, changeCarrying] = useState(0);
    const [seats, changeSeats] = useState();
    const [seatTypes, changeSeatTypes] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();

    function onDataSave() {
        if (!name 
            || !carrying
            || !seats
            || !seatTypes
        ) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        const newAirplane = new Airplane(null, name, carrying, seats, seatTypes);
    }

    function onMassMaxChange(event) {
        const newCarrying = Number(event.target.value);
        if (newCarrying > 0) {
            changeCarrying(newCarrying);
        }
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
                                <div className="form-item">
                                    <label htmlFor="airplane-name">
                                        Airplane name
                                    </label>
                                    <input
                                        type="text"
                                        id="airplane-name"
                                        onChange={(event) => changeName(event.target.value)}
                                        value={name}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="airplane-max-mass">
                                        Max mass
                                    </label>
                                    <input
                                        id="airplane-max-mass"
                                        onChange={onMassMaxChange}
                                        value={carrying}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <SeatEditor 
                            onSeatsChange={changeSeats}
                            onSeatTypesChange={changeSeatTypes}
                        />
                    </div>
                </div>
            </div>
            <div className="custom-button big" onClick={onDataSave}>Save</div>
            {showMessageBox()}
        </div>
    );
}