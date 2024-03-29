import React, { useState } from 'react';

import Headline from '../../../common/headline';
import MessageBox from '../../../common/message-box';

import Country from '../../../../services/place-models/country';
import { duplicate, defaultErrorMessage, invalidInput, added } from '../../../common/message-box-messages';

import * as CountryService from '../../../../services/CountryService';
import { BadRequestError } from '../../../../services/RequestErrors';
import ConfirmActionButton from '../../../common/confirm-action-button';

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
            await CountryService.add(newCountry);
            changeMessageBoxValue(added());
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
                <ConfirmActionButton onClick={onDataSave} buttonContent="Add"/>
            </div>
            {showMessageBox()}
        </div>
    );
}