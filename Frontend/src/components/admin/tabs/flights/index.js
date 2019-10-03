import React, {useState} from 'react';
import AddButton from '../../../common/add-button';
import Flights from './flights';
import * as FlightService from '../../../../services/FlightService';
import SearchOptions from '../../../../services/flight-models/search-options';
import Filter from './filter';

export default function Main() {
    const [flights, changeFlights] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        const foundFlights = await FlightService.searchWithParams(newFilterOptions);

        changeFlights(foundFlights);
    }

    return (
        <div className="tab-content">
            <Filter filterOptions={filterOptions} onFilterApply={onFilterApply}/>
            <AddButton catalog="flights"/>
            <Flights flights={flights}/>
        </div>
    );
}