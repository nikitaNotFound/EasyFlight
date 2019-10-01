import React, { useState } from 'react';

import Headline from '../../../common/headline';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';

import { invalidInput } from '../../../common/message-box-messages';
import Airport from '../../../../services/airport-models/airport';

import * as PlaceService from '../../../../services/PlaceService';
import * as AirportService from '../../../../services/AirportService';

export default function Add() {
    const [name, changeName] = useState();
    const [city, changeCity] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onDataSave() {
        if (!name || !city) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        let newAirport = new Airport(0, name, city.id);

        const addingResult = await AirportService.add(newAirport);

        if (addingResult.successful === true) {
            changeMessageBoxValue("Added!");
        } else {
            changeMessageBoxValue(addingResult.value);
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
                <div className="custom-button big" onClick={onDataSave}>
                    Add
                </div>
            </div>
            {showMessageBox()}
        </div>
    );
}