import React, { useState, useEffect } from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';

import Airport from '../../../../services/airport-models/airport';

import * as AirportService from '../../../../services/AirportService';
import * as PlaceService from '../../../../services/PlaceService';
import { invalidInput, notFound, duplicate, saved, defaultErrorMessage } from '../../../common/message-box-messages';
import { NotFoundError, BadRequestError } from '../../../../services/Errors';

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
                const airportResult = await AirportService.getById(props.match.params.id);

                changeId(airportResult.id);
                changeName(airportResult.name);

                const cityResult = await PlaceService.getCityById(airportResult.value.cityId);

                changeCity(cityResult);

                const countryResult = await PlaceService.getCountryById(cityResult.value.countryId);

                changeCountry(countryResult);

                changeLoadingMode(false);
            } catch (ex) {
                if (ex instanceof NotFoundError) {
                    changeMessageBoxValue(notFound());
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

    async function getCityName(city) {
        const country = await PlaceService.getCountryById(city.countryId);

        const finalName = `${city.name} (${country.value.name})`;

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

                <form method="post" className="adding-form">
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
                                        searchFunc={PlaceService.searchCitiesByName}
                                        searchArgs={[country.id]}
                                        placeholder="City"
                                        currentItem={city}
                                        getItemName={getCityName}
                                        onValueChange={changeCity}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="custom-button big" onClick={onDataSave}>Save</div>
                </form>
                {showMessageBox()}
            </div>
        );
    }
    return <Spinner headline="Loading..."/>
}