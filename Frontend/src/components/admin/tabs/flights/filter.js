import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SearchList from '../../../common/search-list';
import SearchOptions from '../../../../services/flight-models/search-options';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import * as AirportService from '../../../../services/AirportService';
import * as PlaceSerivce from '../../../../services/PlaceService';

function Filter(props) {
    const [fromAirport, changeFromAirport] = useState(props.filterOptions.fromAirport);
    const [toAirport, changeToAirport] = useState(props.filterOptions.toAirport);

    const [fromCountry, changeFromCountry] = useState(props.filterOptions.fromCity);
    const [toCountry, changeToCountry] = useState(props.filterOptions.toCity);

    const [fromCity, changeFromCity] = useState(props.filterOptions.fromCity);
    const [toCity, changeToCity] = useState(props.filterOptions.toCity);

    const [departureDate, changeDepartureDate] = useState(props.filterOptions.departureTime);
    const [departureBackDate, changeDepartureBackDate] = useState(props.filterOptions.departureBackTime);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!fromAirport
            && !toAirport
            && !fromCountry
            && !toCountry
            && !fromCity
            && !toCity
            && !departureDate
            && !departureBackDate
        ) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const newFilter = new SearchOptions(
            fromAirport,
            toAirport,
            fromCity,
            toCity,
            departureDate,
            departureBackDate,
            null,
            null,
            fromCountry,
            toCountry
        );

        props.onFilterApply(newFilter);
    }

    function getAirportName(airport) {
        return airport.name;
    }

    function getCityName(city) {
        return city.name;
    }

    function getCountryName(country) {
        return country.name;
    }

    function showCitiesChooser() {
        if (fromCountry && toCountry) {
            return (
                <div className="filter-row">
                    <div className="filter-arg">
                        <SearchList
                            searchFunc={PlaceSerivce.searchCities}
                            searchArgs={[fromCountry.id]}
                            placeholder="From city"
                            currentItem={fromCity}
                            getItemName={getCityName}
                            onValueChange={changeFromCity}
                        />
                    </div>
                    <div className="filter-arg">
                        <SearchList
                            searchFunc={PlaceSerivce.searchCities}
                            searchArgs={[toCountry.id]}
                            placeholder="To city"
                            currentItem={toCity}
                            getItemName={getCityName}
                            onValueChange={changeToCity}
                        />
                    </div>
                </div>
            );
        }
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return <MessageBox
                        hideFunc={changeMessageBoxValue}
                        message={messageBoxValue}
                    />
        }
    }

    return (
        <div className="filter-body">
            {showMessageBox()}
            <ComponentHeadline content="Filter"/>
            <div className="filter-row">
                <div className="filter-arg">
                    <SearchList
                        searchFunc={AirportService.searchWithParams}
                        placeholder="From airport"
                        currentItem={fromAirport}
                        getItemName={getAirportName}
                        onValueChange={changeFromAirport}
                    />
                </div>
                <div className="filter-arg">
                    <SearchList
                        searchFunc={AirportService.searchWithParams}
                        placeholder="To airport"
                        currentItem={toAirport}
                        getItemName={getAirportName}
                        onValueChange={changeToAirport}
                    />
                </div>
            </div>

            <div className="filter-row">
                <div className="filter-arg">
                    <SearchList
                        searchFunc={PlaceSerivce.searchCountries}
                        placeholder="From country"
                        currentItem={fromCountry}
                        getItemName={getCountryName}
                        onValueChange={changeFromCountry}
                    />
                </div>
                <div className="filter-arg">
                    <SearchList
                        searchFunc={PlaceSerivce.searchCountries}
                        placeholder="To country"
                        currentItem={toCountry}
                        getItemName={getCountryName}
                        onValueChange={changeToCountry}
                    />
                </div>
            </div>

            {showCitiesChooser()}

            <div className="filter-row">
                <div className="filter-arg">
                    <label htmlFor="">Departure date</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(event) => changeDepartureDate(event.target.value)}
                    />
                </div>

                <div className="filter-arg">
                    <label htmlFor="">Departure back date</label>
                    <input
                        type="date"
                        value={departureBackDate}
                        onChange={(event) => changeDepartureBackDate(event.target.value)}
                    />
                </div>
            </div>

            <div className="filter-apply rounded" onClick={onFilterApply}>
                apply
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}

export default Filter;