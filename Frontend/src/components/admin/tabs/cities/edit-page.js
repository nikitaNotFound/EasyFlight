import React, {useState, useEffect} from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';

import City from '../../../../services/place-models/city';

import * as PlaceService from '../../../../services/PlaceService';


export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [name, changeName] = useState();
    const [country, changeCountry] = useState(null);
    
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const foundCity = await PlaceService.getCityById(props.match.params.id);
            changeName(foundCity.name);

            const foundCountry = await PlaceService.getCountryById(foundCity.countryId);
            changeCountry(foundCountry);

            changeLoadingMode(false);
        }
        fetchData();
    }, [props.match.params.id]);

    function onDataSave() {
        if (!name || !country) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        let newAirport = new City(null, country.id, name);
        // HERE WILL BE HTTP REQUEST
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
        return <Spinner headline="Loading..."/>
    }

    return (
        <div className="list-item-action rounded editing">
            <Headline name="Editing country"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <SearchList
                                    searchFunc={PlaceService.searchCountries}
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