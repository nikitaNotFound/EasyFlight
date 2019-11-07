import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SearchList from '../../../common/search-list';
import SearchOptions from '../../../../services/flight-models/search-options';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import * as AirportService from '../../../../services/AirportService';
import * as CountryService from '../../../../services/CountryService';
import * as CityService from '../../../../services/CityService';

function Filter(props) {
    const [fromAirport, changeFromAirport] = useState(props.filterOptions.fromAirport);
    const [toAirport, changeToAirport] = useState(props.filterOptions.toAirport);

    const [fromCity, changeFromCity] = useState(props.filterOptions.fromCity);
    const [toCity, changeToCity] = useState(props.filterOptions.toCity);

    const [departureDate, changeDepartureDate] = useState(props.filterOptions.departureTime);
    const [arrivalDate, changeArrivalkDate] = useState(props.filterOptions.departureBackTime);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!fromAirport
            && !toAirport
            && !fromCity
            && !toCity
            && !departureDate
            && !arrivalDate
        ) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const newFilter = new SearchOptions(
            fromAirport ? fromAirport.id : null,
            toAirport ? toAirport.id : null,
            fromCity ? fromCity.id : null,
            toCity ? toCity.id : null,
            departureDate ? departureDate : null,
            arrivalDate ? arrivalDate : null,
            false,
            null,
        );

        props.onFilterApply(newFilter);
    }

    function getAirportName(airport) {
        return airport.name;
    }

    async function buildCityName(city) {
        const country = await CountryService.getById(city.countryId);

        const finalName = `${city.name} (${country.name})`;

        return finalName;
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    hideFunc={changeMessageBoxValue}
                    message={messageBoxValue}
                />
            );
        }
    }

    return (
        <div className="filter-body">
            {showMessageBox()}
            <ComponentHeadline content="Filter"/>
            <div className="filter-row">
                <div className="filter-arg">
                    <SearchList
                        searchFunc={AirportService.searchByName}
                        placeholder="From airport"
                        currentItem={fromAirport}
                        getItemName={getAirportName}
                        onValueChange={changeFromAirport}
                    />
                </div>
                <div className="filter-arg">
                    <SearchList
                        searchFunc={AirportService.searchByName}
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
                        searchFunc={CityService.searchByName}
                        placeholder="From city"
                        currentItem={fromCity}
                        getItemName={buildCityName}
                        onValueChange={changeFromCity}
                    />
                </div>
                <div className="filter-arg">
                    <SearchList
                        searchFunc={CityService.searchByName}
                        placeholder="To city"
                        currentItem={toCity}
                        getItemName={buildCityName}
                        onValueChange={changeToCity}
                    />
                </div>
            </div>

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
                        value={arrivalDate}
                        onChange={(event) => changeArrivalkDate(event.target.value)}
                    />
                </div>
            </div>

            <button className="filter-apply rounded" onClick={onFilterApply}>
                apply
            </button>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}

export default Filter;