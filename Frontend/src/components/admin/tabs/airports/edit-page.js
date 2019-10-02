import React, {useState, useEffect} from 'react';
import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import SearchList from '../../../common/search-list';
import MessageBox from '../../../common/message-box';
import Airport from '../../../../services/airport-models/airport';
import * as AirportService from '../../../../services/AirportService';
import * as PlaceService from '../../../../services/PlaceService';

export default function EditPage(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [name, changeName] = useState();
    const [country, changeCountry] = useState();
    const [city, changeCity] = useState();
    const [desc, changeDesc] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const airportLoading = AirportService.getById(props.match.params.id);
        airportLoading
            .then(foundAirport => {
                changeName(foundAirport.name);
                changeDesc(foundAirport.description);

                return PlaceService.getCityById(foundAirport.cityId);
            })
            .then(foundCity => {
                changeCity(foundCity);

                return PlaceService.getCountryById(foundCity.countryId);
            })
            .then(foundCountry => {
                changeCountry(foundCountry);
                changeLoadingMode(false);
            })
            .catch(error => {
                alert(error);
            });
    }, [props.match.params.id]);

    function onDataSave() {
        if (!name || !country || !city || !desc) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        let newAirport = new Airport(null, name, city.id, desc);
        // HERE WILL BE HTTP REQUEST
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
                    searchFunc={PlaceService.searchCities}
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
                                        searchFunc={PlaceService.searchCountries}
                                        placeholder="Country"
                                        currentItem={country}
                                        getItemName={getCountryName}
                                        onValueChange={changeCountry}
                                    />
                                    {showCityChooser()}
                                </div>
                                <textarea onChange={changeDesc} value={desc}/>
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