import React, {useState, useEffect} from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';

import City from '../../../../services/place-models/city';
import {  duplicate, defaultErrorMessage, invalidInput, saved } from '../../../common/message-box-messages';

import * as CityService from '../../../../services/CityService';
import * as CountryService from '../../../../services/CountryService';
import { NotFoundError, BadRequestError } from '../../../../services/RequestErrors';
import ConfirmActionButton from '../../../common/confirm-action-button';

export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [id, changeId] = useState();
    const [name, changeName] = useState();
    const [country, changeCountry] = useState(null);
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityRequest = await CityService.getCityById(props.match.params.id);
                changeName(cityRequest.name);
                changeId(cityRequest.id);

                const countryRequest = await CountryService.getCountryById(cityRequest.countryId);
                changeCountry(countryRequest);

                changeLoadingMode(false);
            } catch (ex) {
                if (ex instanceof NotFoundError) {
                    props.history.push('/not-found');
                } else {
                    changeMessageBoxValue(defaultErrorMessage());
                }
            }
        }
        fetchData();
    }, [props.match.params.id]);

    async function onDataSave() {
        if (!name || !country) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        let newCity = new City(id, country.id, name);

        try {
            await CityService.updateCity(newCity);
            changeMessageBoxValue(saved());
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

    if (loading) {
        return (
            <div className="list-item-action rounded editing">
                {showMessageBox()}
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    return (
        <div className="list-item-action rounded editing">
            <Headline name="Editing city"/>

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
                <ConfirmActionButton onClick={onDataSave} buttonContent="Save"/>
            </div>
            {showMessageBox()}
        </div>
    );
}