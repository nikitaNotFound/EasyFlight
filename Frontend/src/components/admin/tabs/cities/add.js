import React, {useState} from 'react';

import Headline from '../../../common/headline';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';
import ConfirmActionButton from '../../../common/confirm-action-button';

import City from '../../../../services/place-models/city';
import { duplicate, defaultErrorMessage, invalidInput, added } from '../../../common/message-box-messages';

import * as CityService from '../../../../services/CityService';
import * as CountryService from '../../../../services/CountryService';
import { BadRequestError } from '../../../../services/RequestErrors';

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
            await CityService.addCity(newCity);
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
                                    searchFunc={CountryService.searchCountriesByName}
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
                <ConfirmActionButton onClick={onDataSave} buttonContent="Add"/>
            </div>
            {showMessageBox()}
        </div>
    );
}