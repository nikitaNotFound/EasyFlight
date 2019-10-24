import React, { useState } from 'react';

import Headline from '../../../common/headline';
import MessageBox from '../../../common/message-box';

import Country from '../../../../services/place-models/country';
import { duplicate, defaultErrorMessage, invalidInput } from '../../../common/error-messages';

import * as PlaceService from '../../../../services/PlaceService';
import { BadRequestError } from '../../../../services/Errors';


export default function Add() {
    const [name, changeName] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onDataSave() {
        if (!name) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        let newCountry = new Country(null, name);

        try {
            await PlaceService.addCountry(newCountry);
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate(name));
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
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
        <div className="list-item-action rounded editing">
            <Headline name="Adding country"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="airport-name">Country name</label>
                                    <input
                                        id="airport-name"
                                        type="text"
                                        onChange={(event) => changeName(event.target.value)}
                                        value={name}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-button big" onClick={onDataSave}>Add</div>
            </div>
            {showMessageBox()}
        </div>
    );
}