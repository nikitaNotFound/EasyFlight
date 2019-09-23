import React, {useState, useEffect} from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';

import City from '../../../../services/place-models/city';

import * as PlaceService from '../../../../services/PlaceService';


export default function Add(props) {
    const [name, changeName] = useState();
    const [country, changeCountry] = useState(null);
    
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onDataSave() {
        if (!name || !country) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        let newCity = new City(0, country.id, name);
        
        const insertResult = await PlaceService.addCity(newCity);

        if (insertResult === true) {
            changeMessageBoxValue('Added!');
        } else {
            changeMessageBoxValue(insertResult.message);
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
                <div className="custom-button big" onClick={onDataSave}>Add</div>
            </div>
            {showMessageBox()}
        </div>
    );
}