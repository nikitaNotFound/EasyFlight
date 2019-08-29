import React, {useState} from 'react';
import Headline from '../common/headline';
import Airport from '../../../../services/airports-models/airport';

function Adding () {
    const [name, changeName] = useState();
    const [country, changeCountry] = useState();
    const [city, changeCity] = useState();
    const [desc, changeDesc] = useState();

    function onNameChange(event) {
        changeName(event.target.value);
    }

    function onCountryChange(event) {
        changeCountry(event.target.value);
    }

    function onCityChange(event) {
        changeCity(event.target.value);
    }

    function onDescChange(event) {
        changeDesc(event.target.value);
    }

    function onDataSave() {
        if (!name || !country || !city || !desc) {
            return;
        }

        let newAirport = new Airport(null, name, country, city, desc);
        console.log(newAirport);
        //HERE WILL BE HTTP REQUEST
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
                                <div className="form-item">
                                    <label htmlFor="airport-country">Country</label>
                                    <input id="airport-country" value={country} onChange={onCountryChange} type="text" placeholder="country"/>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="airport-city">City</label>
                                    <input id="airport-city" value={city} onChange={onCityChange} type="text" placeholder="city"/>
                                </div>
                                <br/>
                            </div>
                            <textarea onChange={onDescChange} value={desc} placeholder="description"/>
                        </div>
                    </div>
                </div>
                <div className="custom-button big" onClick={onDataSave}>Save</div>
            </div>
        </div>
    );
}

export default Adding;