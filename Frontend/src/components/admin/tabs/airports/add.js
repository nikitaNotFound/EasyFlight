import React, { useState } from 'react';

import Headline from '../../../common/headline';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';

import Airport from '../../../../services/airport-models/airport';
import { invalidInput, duplicate, defaultErrorMessage, added } from '../../../common/message-box-messages';

import * as PlaceService from '../../../../services/PlaceService';
import * as AirportService from '../../../../services/AirportService';
import { BadRequestError } from '../../../../services/RequestErrors';
import ConfirmActionButton from '../../../common/confirm-action-button';

export default function Add() {
    const [name, changeName] = useState();
    const [city, changeCity] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onDataSave() {
        if (!name || !city) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        const newAirport = new Airport(null, name, city.id);

        try {
            await AirportService.add(newAirport);
            changeMessageBoxValue(added());
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate(name));
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    async function getCityName(city) {
        const country = await PlaceService.getCountryById(city.countryId);

        const finalName = `${city.name} (${country.name})`;

        return finalName;
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
            <Headline name="Adding new airport"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="airport-name">Airport name</label>
                                    <input
                                        id="airport-name"
                                        value={name}
                                        onChange={(event) => changeName(event.target.value)}
                                        type="text"
                                        placeholder="airport name"
                                    />
                                </div>
                                <SearchList
                                    searchFunc={PlaceService.searchCitiesByName}
                                    placeholder="City"
                                    currentItem={city}
                                    getItemName={getCityName}
                                    onValueChange={changeCity}
                                />
                                <br/>
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