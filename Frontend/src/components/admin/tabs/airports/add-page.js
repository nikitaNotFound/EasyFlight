import React, {useState} from 'react';
import Headline from '../../../common/headline';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import Airport from '../../../../services/airport-models/airport';
import * as PlaceService from '../../../../services/PlaceService';

function Adding() {
    const [name, changeName] = useState();
    const [country, changeCountry] = useState();
    const [city, changeCity] = useState();
    const [desc, changeDesc] = useState();

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onNameChange(event) {
        changeName(event.target.value);
    }

    function onCountryChange(country) {
        changeCountry(country);
    }

    function onCityChange(city) {
        changeCity(city);
    }

    function onDescChange(event) {
        changeDesc(event.target.value);
    }

    function onDataSave() {
        if (!name || !country || !city || !desc) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        let newAirport = new Airport(null, name, city.id, desc);
        //HERE WILL BE HTTP REQUEST
    }

    function getCountryName(country) {
        return country.name;
    }

    function getCityName(city) {
        return city.name;
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox message={messageBoxValue} hideFunc={hideMessageBox}/>
            );
        }
    }

    function hideMessageBox() {
        changeMessageBoxValue(null);
    }

    function showCityChooser() {
        if (country) {
            return (
                <SearchList
                    searchFunc={PlaceService.searchCities}
                    searchArgs={[country.id]}
                    placeholder="City"
                    currentItem={city}
                    getItemName={getCityName}
                    onValueChange={onCityChange}
                />
            );
        }
    }

    return (
        <div className="list-item-action adding">
            <Headline name="Adding new airport"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="airport-name">Airport name</label>
                                    <input id="airport-name" value={name} onChange={onNameChange} type="text" placeholder="airport name"/>
                                </div>
                                <SearchList
                                    searchFunc={PlaceService.searchCountries}
                                    placeholder="Country"
                                    currentItem={country}
                                    getItemName={getCountryName}
                                    onValueChange={onCountryChange}
                                />
                                {showCityChooser()}
                                <br/>
                            </div>
                            <textarea onChange={onDescChange} value={desc} placeholder="description"/>
                        </div>
                    </div>
                </div>
                <div className="custom-button big" onClick={onDataSave}>Save</div>
            </div>
            {showMessageBox()}
        </div>
    );
}

export default Adding;