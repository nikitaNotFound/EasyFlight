import React, {useState, useEffect} from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';
import Spinner from '../common/spinner';
import SearchOptions from '../../services/flight-models/search-options';
import * as FlightsService from '../../services/FlightService';

function getEmptyFilterOptions() {
    return new SearchOptions(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    );
}

function Content() {
    const [flights, changeFlights] = useState(null);
    const [filterOptions, changeFilterOptions] = useState(getEmptyFilterOptions);
    const layoutMode = {
        List: 'list-only',
        Filter: 'filter-only'
    };
    const [mode, changeMode] = useState(layoutMode.List);

    function swapFilterList() {
        const newMode = mode === layoutMode.List
            ? layoutMode.Filter
            : layoutMode.List;

        changeMode(newMode);
    }

    function onFilterApplied(searchOptions) {
        changeFilterOptions(searchOptions);
        console.log(searchOptions);

        const flightsLoading = FlightsService.searchWithParams(searchOptions);

        flightsLoading
            .then(flights => {
                changeFlights(flights);
            })
            .catch(error => {
                alert(error);
            })
    }

    if (!flights) {
        return <Filter onFilterApplied={onFilterApplied} filterOptions={filterOptions}/>
    }

    return (
        <main className={`rounded ${mode}`}>
            <Switcher switcher={swapFilterList}/>
            <Flights flights={flights}/>
            <Filter onFilterApplied={onFilterApplied} filterOptions={filterOptions}/>
        </main>
    );
}

export default Content;