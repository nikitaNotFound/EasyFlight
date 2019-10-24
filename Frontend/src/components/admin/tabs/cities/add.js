import React, {useState} from 'react';

import Headline from '../../../common/headline';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';

import City from '../../../../services/place-models/city';
import { duplicate, defaultMessage, invalidInput } from '../../../common/error-messages';

import * as PlaceService from '../../../../services/PlaceService';
import { BadRequestError } from '../../../../services/Errors';

export default function Add() {
    const [name, changeName] = useState();
    const [country, changeCountry] = useState(null);
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onDataSave() {
        if (!name || !country) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        const newCity = new City(null, country.id, name);

        try {
            await PlaceService.addCity(newCity);
            changeMessageBoxValue('Added!');
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate(name));
            } else {
                changeMessageBoxValue(defaultMessage());
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

    function getCountryName(country) {
        return country.name;
    }

    return (
        <div className="list-item-action rounded editing">
            <Headline name="Adding city"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <SearchList
                                    searchFunc={PlaceService.searchCountriesByName}
                                    placeholder="Country"
                                    currentItem={country}
                                    onValueChange={changeCountry}
                                    getItemName={getCountryName}
                                />
                                <div className="form-item">
                                    <label htmlFor="city-name">City name</label>
                                    <input
                                        id="city-name"
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