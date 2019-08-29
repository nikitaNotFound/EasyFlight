import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import Spinner from '../../../common/spinner';
import Airport from '../../../../services/airports-models/airport';
import * as AirportService from '../../../../services/AirportService';

function Edit (props) {
    const [loading, changeLoadingMode] = useState(true);
    const [name, changeName] = useState();
    const [country, changeCountry] = useState();
    const [city, changeCity] = useState();
    const [desc, changeDesc] = useState();

    useEffect(() => {
        const airportLoading = AirportService.getAirportById(props.match.params.id);
        airportLoading
            .then(data => {
                onDataSuccessful(data);
            })
            .catch(error => {
                onDataFail(error);
            });
    }, []);

    function onDataSuccessful(data) {
        changeName(data.name);
        changeCountry(data.country);
        changeCity(data.city);
        changeDesc(data.desc);
        changeLoadingMode(false);
    }

    function onDataFail(error) {
        alert(error);
    }

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
        let newAirport = new Airport(null, name, country, city, desc);
        console.log(newAirport);
        //HERE WILL BE HTTP REQUEST
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
                                        <input id="airport-name" type="text" onChange={onNameChange} value={name}/>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="airport-counrty">Country</label>
                                        <input id="airport-country" type="text" onChange={onCountryChange} value={country}/>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="airport-city">City</label>
                                        <input id="airport-city" type="text" onChange={onCityChange} value={city}/>
                                    </div>
                                    <br/>
                                </div>
                                <textarea onChange={onDescChange} value={desc}/>
                            </div>
                        </div>
                    </div>
                    <div className="custom-button big" onClick={onDataSave}>Save</div>
                </form>
            </div>
        );
    }
    return (
        <Spinner/>
    );
}

export default Edit;