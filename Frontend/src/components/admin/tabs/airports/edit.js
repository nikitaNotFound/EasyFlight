import React, { useState, useEffect } from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';

import Airport from '../../../../services/airport-models/airport';

import * as AirportService from '../../../../services/AirportService';
import * as PlaceService from '../../../../services/PlaceService';
import { invalidInput } from '../../../common/message-box-messages';

export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [id, changeId] = useState();
    const [name, changeName] = useState();
    const [country, changeCountry] = useState();
    const [city, changeCity] = useState();
    const [desc, changeDesc] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const airportResult = await AirportService.getById(props.match.params.id);
            if (airportResult.successful === false) {
                changeMessageBoxValue(airportResult.value);
                return;
            }

            changeId(airportResult.value.id);
            changeName(airportResult.value.name);
            changeDesc(airportResult.value.description);

            const cityResult = await PlaceService.getCityById(airportResult.value.cityId);
            if (cityResult.successful === false) {
                changeMessageBoxValue(cityResult.value);
                return;
            }

            changeCity(cityResult.value);

            const countryResult = await PlaceService.getCountryById(cityResult.value.countryId);
            if (countryResult.successful === false) {
                changeMessageBoxValue(countryResult.value);
                return;
            }

            changeCountry(countryResult.value);

            changeLoadingMode(false);
        }
        fetchData();
    }, [props.match.params.id]);

    function onDataSave() {
        if (!name || !country || !city) {
            changeMessageBoxValue(invalidInput());

            return;
        }

        let newAirport = new Airport(id, name, city.id);
        
        const updateResult = await AirportService.update(newAirport)

        if (updateResult.successful === true) {
            changeMessageBoxValue('Updated!');
        } else {
            changeMessageBoxValue(updateResult.value);
        }
    }

    function getCountryName(country) {
        return country.name;
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

    function showCityChooser() {
        if (country) {
            return (
                <SearchList
                    searchFunc={PlaceService.searchCitiesByName}
                    searchArgs={[country.id]}
                    placeholder="City"
                    currentItem={city}
                    getItemName={getCityName}
                    onValueChange={changeCity}
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
                                        searchFunc={PlaceService.searchCountriesByName}
                                        placeholder="Country"
                                        currentItem={country}
                                        getItemName={getCountryName}
                                        onValueChange={changeCountry}
                                    />
                                    {showCityChooser()}
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