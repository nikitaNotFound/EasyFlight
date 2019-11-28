import React, {useState} from 'react';
import ComponentHeadline from '../../common/component-headline';
import * as CountryService from '../../../services/CountryService';
import * as CityService from '../../../services/CityService';
import * as AirportService from '../../../services/AirportService';
import SearchOptions from '../../../services/flight-models/search-options';
import MessageBox from '../../common/message-box';
import SearchList from '../../common/search-list';
import PropsTypes from 'prop-types';
import ParamField from '../../common/param-field';

function Filter(props) {
    const [fromCity, changeFromCity] = useState(props.filterOptions.fromCity);
    const [toCity, changeToCity] = useState(props.filterOptions.toCity);

    const [fromAirport, changeFromAirport] = useState(props.filterOptions.fromAirport);
    const [toAirport, changeToAirport] = useState(props.filterOptions.toAirport);

    const [departureDate, changeDepartureDate] = useState(props.filterOptions.departureDate);
    const [arrivalDate, changeArrivalDate] = useState(props.filterOptions.arrivalDate);

    const [departureBackDate, changeDepartureBackDate] = useState(props.filterOptions.departureBackDate);
    const [arrivalBackDate, changeArrivalBackDate] = useState(props.filterOptions.arrivalBackDate);

    const [ticketCount, changeTicketsCount] = useState(
        props.filterOptions.ticketCount
        ? props.filterOptions.ticketCount
        : 0
    );
    const [searchToAndBack, changeSearchToAndBack] = useState(props.filterOptions.searchToAndBack);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApplied() {
        if (!fromCity
            && !toCity
            && !fromAirport
            && !toAirport
            && !departureDate
            && !arrivalDate
            && !ticketCount
        ) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const newOptions = new SearchOptions(
            fromAirport ? fromAirport.id : null,
            toAirport ? toAirport.id : null,
            fromCity ? fromCity.id : null,
            toCity ? toCity.id : null,
            departureDate,
            arrivalDate,
            ticketCount,
            searchToAndBack,
            departureBackDate,
            arrivalBackDate
        );

        props.onFilterApplied(newOptions);
    }

    async function buildCityName(city) {
        const countryResult = await CountryService.getById(city.countryId);

        const finalName = `${city.name} (${countryResult.name})`;

        return finalName;
    }

    async function getAirportName(airport) {
        const city = await CityService.getById(airport.cityId);
        const country = await CountryService.getById(city.countryId);

        const finalName = `${airport.name} (${city.name}, ${country.name})`;

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

    function showBackFlightsTimeOptions() {
        if (searchToAndBack === true) {
            return (
                <div className="row filter-item">
                    <div className="filter-col">
                        <label htmlFor="departure">
                            Departure back
                        </label>
                        <input
                            className="filter-control"
                            type="date"
                            id="departure"
                            placeholder="Date"
                            value={departureBackDate}
                            onChange={(event) => changeDepartureBackDate(event.target.value)}
                        />
                    </div>
                    <div className="filter-col">
                        <label htmlFor="arrival">
                            Arrival back
                        </label>
                        <input
                            className="filter-control"
                            id="arrival"
                            type="date"
                            placeholder="Date"
                            value={arrivalBackDate}
                            onChange={(event) => changeArrivalBackDate(event.target.value)}
                        />
                    </div>
                </div>
            );
        }
    }

    function showToCityPicker() {
        if (!toAirport) {
            return (
                <SearchList
                    searchFunc={CityService.searchByName}
                    placeholder="To city"
                    currentItem={toCity}
                    getItemName={buildCityName}
                    onValueChange={changeToCity}
                />
            );
        }
    }

    function showFromCityPicker() {
        if (!fromAirport) {
            return (
                <SearchList
                    searchFunc={CityService.searchByName}
                    placeholder="From city"
                    currentItem={fromCity}
                    getItemName={buildCityName}
                    onValueChange={changeFromCity}
                />
            );
        }
    }

    function showToAirportPicker() {
        if (!toCity) {
            return (
                <SearchList
                    searchFunc={AirportService.searchByName}
                    placeholder="To airport"
                    currentItem={toAirport}
                    getItemName={getAirportName}
                    onValueChange={changeToAirport}
                />
            );
        }
    }

    function showFromAirportPicker() {
        if (!fromCity) {
            return (
                <SearchList
                    searchFunc={AirportService.searchByName}
                    placeholder="From airport"
                    currentItem={fromAirport}
                    getItemName={getAirportName}
                    onValueChange={changeFromAirport}
                />
            );
        }
    }

    return (
        <main className="list-filter rounded">
            {showMessageBox()}
            <ComponentHeadline content="Filter" />

            <div className="filter-area">
                <div className="filter-item">
                    {showFromCityPicker()}
                    {showFromAirportPicker()}
                </div>

                <div className="filter-item">
                    {showToCityPicker()}
                    {showToAirportPicker()}
                </div>

                <div className="filter-item">
                    <div className="filter-col">
                        <label htmlFor="departure">
                            Departure
                        </label>
                        <input
                            className="filter-control"
                            type="date"
                            id="departure"
                            placeholder="Date"
                            value={departureDate}
                            onChange={(event) => changeDepartureDate(event.target.value)}
                        />
                    </div>
                    <div className="filter-col">
                        <label htmlFor="arrival">
                            Arrival
                        </label>
                        <input
                            className="filter-control"
                            id="arrival"
                            type="date"
                            placeholder="Date"
                            value={arrivalDate}
                            onChange={(event) => changeArrivalDate(event.target.value)}
                        />
                    </div>
                </div>

                <div className="filter-item">
                    <ParamField
                        name="Amount of tickets"
                        value={ticketCount}
                        onChange={changeTicketsCount}
                    />
                </div>

                <div className="filter-item">
                    <input
                        type="checkbox"
                        className="form-control checkbox-control"
                        checked={searchToAndBack}
                        onChange={(event) => changeSearchToAndBack(event.target.checked)}
                    />
                    Search flights to place and back
                </div>

                {showBackFlightsTimeOptions()}

                <div className="filter-item">
                    <button className="btn btn-primary button-filter" onClick={onFilterApplied}>
                        Search
                    </button>
                </div>
            </div>
        </main>
    );
}

Filter.propsTypes = {
    onFilterApplied: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}

export default Filter;