import React, {useState} from 'react';
import ComponentHeadline from '../../common/component-headline';
import * as PlaceService from '../../../services/PlaceService';
import * as AirportService from '../../../services/AirportService';
import SearchOptions from '../../../services/flight-models/search-options';
import MessageBox from '../../common/message-box';
import SearchList from '../../common/search-list';
import PropsTypes from 'prop-types';

function Filter(props) {
    const [fromCountry, changeFromCountry] = useState(props.filterOptions.fromCountry);
    const [toCountry, changeToCountry] = useState(props.filterOptions.toCountry);

    const [fromCity, changeFromCity] = useState(props.filterOptions.fromCity);
    const [toCity, changeToCity] = useState(props.filterOptions.toCity);

    const [fromAirport, changeFromAirport] = useState(props.filterOptions.fromAirport);
    const [toAirport, changeToAirport] = useState(props.filterOptions.toAirport);

    const [departureTime, changeDepartureTime] = useState(props.filterOptions.departureTime);
    const [departureBackTime, changeDepartureBackTime] = useState(props.filterOptions.departureBackTime);

    const [ticketCount, changeTicketsCount] = useState(props.filterOptions.ticketCount);
    const [searchToAndBack, changeSearchToAndBack] = useState(props.filterOptions.searchToAndBack);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApplied() {
        if (!fromCountry
            && !toCountry
            && !fromCity
            && !toCity
            && !fromAirport
            && !toAirport
            && !departureTime
            && !departureBackTime
            && !ticketCount
        ) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const newOptions = new SearchOptions(
            fromAirport,
            toAirport,
            fromCity,
            toCity,
            departureTime,
            departureBackTime,
            ticketCount,
            searchToAndBack,
            fromCountry,
            toCountry
        );

        props.onFilterApplied(newOptions);
    }

    async function getCityName(city) {
        const countryResult = await PlaceService.getCountryById(city.countryId);

        const finalName = `${city.name} (${countryResult.bodyContent.name})`;

        return finalName;
    }

    function getAirportName(airport) {
        return airport.name;
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
        <main className="list-filter rounded">
            {showMessageBox()}
            <ComponentHeadline content="Filter" />

            <div className="filter-area">
                <div className="row filter-item">
                    <SearchList
                        searchFunc={PlaceService.searchCitiesByName}
                        placeholder="From city"
                        currentItem={fromCity}
                        getItemName={getCityName}
                        onValueChange={changeFromCity}
                    />
                    <SearchList
                        searchFunc={PlaceService.searchCitiesByName}
                        placeholder="To city"
                        currentItem={toCity}
                        getItemName={getCityName}
                        onValueChange={changeToCity}
                    />
                </div>

                <div className="row filter-item">
                    <SearchList
                        searchFunc={AirportService.search}
                        placeholder="From airport"
                        currentItem={fromAirport}
                        getItemName={getAirportName}
                        onValueChange={changeFromAirport}
                    />
                    <SearchList
                        searchFunc={AirportService.search}
                        placeholder="To airport"
                        currentItem={toAirport}
                        getItemName={getAirportName}
                        onValueChange={changeToAirport}
                    />
                </div>

                <div className="row filter-item">
                    <div className="filter-col">
                        <label htmlFor="departure">
                            Departure
                        </label>
                        <input
                            className="filter-control"
                            type="date"
                            id="departure"
                            placeholder="Date"
                            value={departureTime}
                            onChange={(event) => changeDepartureTime(event.target.value)}
                        />
                    </div>
                    <div className="filter-col">
                        <label htmlFor="departure-back">
                            Departure back
                        </label>
                        <input
                            className="filter-control"
                            id="departure-back"
                            type="date"
                            placeholder="Date"
                            value={departureBackTime}
                            onChange={(event) => changeDepartureBackTime(event.target.value)}
                        />
                    </div>
                </div>

                <div className="row filter-item">
                    <div className="filter-col">
                        <label htmlFor="tickets">
                            Amount of tickets
                        </label>
                        <input
                            className="filter-control"
                            id="tickets"
                            placeholder="Count"
                            value={ticketCount}
                            onChange={(event) => changeTicketsCount(event.target.value)}
                        />
                    </div>
                </div>

                <div className="row filter-item">
                    <input
                        type="checkbox"
                        className="form-control checkbox-control"
                        checked={searchToAndBack}
                        onChange={(event) => changeSearchToAndBack(event.target.checked)}
                    />
                    Search flights to place and back
                </div>

                <div className="row filter-item">
                    <div
                        className="btn btn-primary button-filter"
                        onClick={onFilterApplied}
                    >
                        Apply filter
                    </div>
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