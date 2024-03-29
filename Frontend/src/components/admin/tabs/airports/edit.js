import React, { useState, useEffect } from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';

import Airport from '../../../../services/airport-models/airport';

import * as AirportService from '../../../../services/AirportService';
import * as CityService from '../../../../services/CityService';
import * as CountryService from '../../../../services/CountryService';
import { invalidInput, duplicate, saved, defaultErrorMessage } from '../../../common/message-box-messages';
import { NotFoundError, BadRequestError } from '../../../../services/RequestErrors';
import ConfirmActionButton from '../../../common/confirm-action-button';

export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [id, changeId] = useState();
    const [name, changeName] = useState();
    const [country, changeCountry] = useState();
    const [city, changeCity] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const airport = await AirportService.getById(props.match.params.id);

                changeId(airport.id);
                changeName(airport.name);

                const city = await CityService.getById(airport.cityId);

                changeCity(city);

                const countryResult = await CountryService.getById(city.countryId);

                changeCountry(countryResult);

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
        if (!name || !country || !city) {
            changeMessageBoxValue(invalidInput());

            return;
        }

        let newAirport = new Airport(id, name, city.id);
        
        try {
            await AirportService.update(newAirport)
            changeMessageBoxValue(saved());
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate(name));
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    async function buildCityName(city) {
        const country = await CountryService.getById(city.countryId);

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

    if (!loading) {
        return (
            <div className="list-item-action rounded editing">
                <Headline name="Editing airport"/>

                <div className="adding-form">
                    <div className="row">
                        <div className="col-12">
                            <div className="editing-params-form">
                                <div className="row">
                                    <div className="form-item">
                                        <label htmlFor="airport-name">Airport name</label>
                                        <input
                                            id="airport-name"
                                            type="text"
                                            onChange={(event) => changeName(event.target.value)}
                                            value={name}
                                        />
                                    </div>
                                    <SearchList
                                        searchFunc={CityService.searchByName}
                                        searchArgs={[country.id]}
                                        placeholder="City"
                                        currentItem={city}
                                        getItemName={buildCityName}
                                        onValueChange={changeCity}
                                    />
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
    return <Spinner headline="Loading..."/>
}