import React, { useState, useEffect } from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';

import Airport from '../../../../services/airport-models/airport';

import * as AirportService from '../../../../services/AirportService';
import * as PlaceService from '../../../../services/PlaceService';
import { invalidInput, notFound, duplicate, saved } from '../../../common/message-box-messages';

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
                
            }
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