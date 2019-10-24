import React, {useState, useEffect} from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';

import City from '../../../../services/place-models/city';

import * as PlaceService from '../../../../services/PlaceService';

export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [id, changeId] = useState();
    const [name, changeName] = useState();
    const [country, changeCountry] = useState(null);
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityRequest = await PlaceService.getCityById(props.match.params.id);
                changeName(cityRequest.name);
                changeId(cityRequest.id);

                const countryRequest = await PlaceService.getCountryById(cityRequest.countryId);
                changeCountry(countryRequest);

                changeLoadingMode(false);
            } catch (ex) {
                if (ex.name == 'NotFoundError') {
                    changeMessageBoxValue(`City with id '${props.match.params.id}' not found!`);
                } else {
                    changeMessageBoxValue("Something went wrong...");
                }
            }
        }
        fetchData();
    }, [props.match.params.id]);

    async function onDataSave() {
        if (!name || !country) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        let newCity = new City(id, country.id, name);

        try {
            await PlaceService.updateCity(newCity);
            changeMessageBoxValue('Saved!');
        } catch (ex) {
            if (ex.name == 'BadRequestError') {
                changeMessageBoxValue(`${name} already exists!`);
            } else {
                changeMessageBoxValue("Something went wrong...");
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
                <div className="custom-button big" onClick={onDataSave}>Save</div>
            </div>
            {showMessageBox()}
        </div>
    );
}